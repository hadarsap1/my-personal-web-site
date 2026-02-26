/* Analytics — lightweight visitor tracking via Supabase */
(function () {
  // ── Config ──────────────────────────────────────────────
  const SUPABASE_URL = 'https://cbkuupjmemimbfuahizn.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNia3V1cGptZW1pbWJmdWFoaXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTkyNjEsImV4cCI6MjA4NzUzNTI2MX0.q4BDFj5KN25_FmI2yofH9SBDsFcep9GKZ_VL3UMJLb0';
  const TABLE = 'visits';

  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') return; // skip until configured

  let sb, visitId, startTime = Date.now();

  // ── Helpers ─────────────────────────────────────────────
  function detectDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera';
    if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari';
    return 'Other';
  }

  function detectOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (/Android/i.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
    return 'Other';
  }

  // ── Geo helpers ────────────────────────────────────────
  async function hashIP(ip) {
    if (!ip) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Try ipapi.co first, fall back to ip-api.com
  async function fetchGeo() {
    // Attempt 1: ipapi.co
    try {
      const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
      if (r.ok) {
        const g = await r.json();
        if (g.country_name) return {
          country: g.country_name, countryCode: g.country_code, city: g.city,
          region: g.region, lat: g.latitude, lng: g.longitude, org: g.org,
          tz: g.timezone, ip: g.ip
        };
      }
    } catch (_) {}

    // Attempt 2: ip-api.com (free, no key needed, http only)
    try {
      const r = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp,query', { signal: AbortSignal.timeout(4000) });
      if (r.ok) {
        const g = await r.json();
        if (g.status === 'success') return {
          country: g.country, countryCode: g.countryCode, city: g.city,
          region: g.regionName, lat: g.lat, lng: g.lon, org: g.isp,
          tz: g.timezone, ip: g.query
        };
      }
    } catch (_) {}

    return null;
  }

  // ── Init ────────────────────────────────────────────────
  async function init() {
    try {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

      // Fetch geo — IP is hashed (SHA-256) for returning-visitor detection, never stored raw
      let country = null, countryCode = null, city = null;
      let region = null, latitude = null, longitude = null, org = null, tz = null, ipHash = null;

      const geo = await fetchGeo();
      if (geo) {
        country = geo.country || null;
        countryCode = geo.countryCode || null;
        city = geo.city || null;
        region = geo.region || null;
        latitude = geo.lat || null;
        longitude = geo.lng || null;
        org = geo.org || null;
        tz = geo.tz || null;
        ipHash = await hashIP(geo.ip);
      }

      const row = {
        page_url: location.pathname + location.search,
        referrer: document.referrer || null,
        country: country,
        country_code: countryCode,
        city: city,
        region: region,
        latitude: latitude,
        longitude: longitude,
        org: org,
        timezone: tz,
        device_type: detectDevice(),
        browser: detectBrowser(),
        os: detectOS(),
        screen_resolution: screen.width + 'x' + screen.height,
        language: navigator.language || null,
        ip_hash: ipHash,
        time_spent_s: 0
      };

      const { data, error } = await sb.from(TABLE).insert(row).select('id').single();
      if (!error && data) visitId = data.id;
    } catch (_) { /* analytics must never break the site */ }
  }

  // ── Update time spent on leave ──────────────────────────
  function updateTime() {
    if (!sb || !visitId) return;
    const seconds = Math.round((Date.now() - startTime) / 1000);
    // Use keepalive so the request survives page close
    fetch(SUPABASE_URL + '/rest/v1/' + TABLE + '?id=eq.' + visitId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ time_spent_s: seconds }),
      keepalive: true
    });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') updateTime();
  });
  window.addEventListener('beforeunload', updateTime);

  // ── Go ──────────────────────────────────────────────────
  init();
})();

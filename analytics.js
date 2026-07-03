/* Analytics - lightweight visitor tracking via Supabase REST API (no SDK needed) */
(function () {
  // ── Config ──────────────────────────────────────────────
  const SUPABASE_URL = 'https://cbkuupjmemimbfuahizn.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNia3V1cGptZW1pbWJmdWFoaXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NTkyNjEsImV4cCI6MjA4NzUzNTI2MX0.q4BDFj5KN25_FmI2yofH9SBDsFcep9GKZ_VL3UMJLb0';
  const TABLE = 'visits';
  // Salt prevents rainbow-table reversal of the IPv4 space
  const IP_SALT = 'hadarsap-v1';

  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') return;

  const HEADERS = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
  };

  let visitId, startTime = Date.now();
  let maxScrollDepth = 0, clickCount = 0, focusedTime = 0, lastFocusAt = Date.now();

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

  function getUTMParams() {
    var params = new URLSearchParams(location.search);
    return {
      utm_source: params.get('utm_source') || null,
      utm_medium: params.get('utm_medium') || null,
      utm_campaign: params.get('utm_campaign') || null
    };
  }

  function getViewport() {
    return window.innerWidth + 'x' + window.innerHeight;
  }

  function getConnectionType() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return null;
    return c.effectiveType || c.type || null;
  }

  function isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // ── Scroll depth tracking ────────────────────────────────
  function trackScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight
    );
    var winHeight = window.innerHeight;
    if (docHeight <= winHeight) { maxScrollDepth = 100; return; }
    var pct = Math.round((scrollTop + winHeight) / docHeight * 100);
    if (pct > maxScrollDepth) maxScrollDepth = Math.min(pct, 100);
  }
  window.addEventListener('scroll', trackScroll, { passive: true });

  // ── Click count tracking ─────────────────────────────────
  document.addEventListener('click', function () { clickCount++; });

  // ── Focused time tracking (active tab only) ──────────────
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      focusedTime += Date.now() - lastFocusAt;
    } else {
      lastFocusAt = Date.now();
    }
  });

  // ── Geo helpers ────────────────────────────────────────
  async function hashIP(ip) {
    if (!ip) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(IP_SALT + ip));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function fetchGeo() {
    try {
      const r = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(4000) });
      if (r.ok) {
        const g = await r.json();
        if (g.success !== false && g.country) return {
          country: g.country, countryCode: g.country_code, city: g.city,
          region: g.region, lat: g.latitude, lng: g.longitude,
          org: g.connection && g.connection.org || null,
          tz: g.timezone && g.timezone.id || null, ip: g.ip
        };
      }
    } catch (_) {}

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

    return null;
  }

  // ── REST helpers ─────────────────────────────────────────
  async function restInsert(row) {
    const r = await fetch(SUPABASE_URL + '/rest/v1/' + TABLE, {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'return=representation' },
      body: JSON.stringify(row)
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data && data[0] ? data[0].id : null;
  }

  // ── Init ────────────────────────────────────────────────
  async function init() {
    var existingId = sessionStorage.getItem('_v_id');
    if (existingId) { visitId = existingId; return; }

    var COOLDOWN_MS = 10 * 60 * 1000;
    try {
      var lastTs = parseInt(localStorage.getItem('_v_ts') || '0', 10);
      var lastId = localStorage.getItem('_v_lid');
      if (lastId && Date.now() - lastTs < COOLDOWN_MS) {
        visitId = lastId;
        sessionStorage.setItem('_v_id', lastId);
        return;
      }
    } catch (_) {}

    try {
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

      var utm = getUTMParams();

      const row = {
        page_url: location.pathname + location.search,
        referrer: document.referrer || null,
        country, country_code: countryCode, city, region,
        latitude, longitude, org, timezone: tz,
        device_type: detectDevice(),
        browser: detectBrowser(),
        os: detectOS(),
        screen_resolution: screen.width + 'x' + screen.height,
        language: navigator.language || null,
        ip_hash: ipHash,
        time_spent_s: 0,
        scroll_depth: 0,
        click_count: 0,
        focused_time_s: 0,
        viewport: getViewport(),
        connection_type: getConnectionType(),
        is_touch: isTouch(),
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        visit_hour: new Date().getHours(),
        visit_weekday: new Date().getDay()
      };

      const id = await restInsert(row);
      if (id) {
        visitId = id;
        try {
          sessionStorage.setItem('_v_id', id);
          localStorage.setItem('_v_lid', id);
          localStorage.setItem('_v_ts', Date.now().toString());
        } catch (_) {}
      }
    } catch (_) { /* analytics must never break the site */ }
  }

  // ── Update engagement data on leave (via security-definer RPC) ──
  function updateEngagement() {
    if (!visitId) return;
    var seconds = Math.round((Date.now() - startTime) / 1000);
    var totalFocused = focusedTime;
    if (document.visibilityState !== 'hidden') {
      totalFocused += Date.now() - lastFocusAt;
    }
    var focusedSec = Math.round(totalFocused / 1000);

    fetch(SUPABASE_URL + '/rest/v1/rpc/update_visit_engagement', {
      method: 'POST',
      headers: { ...HEADERS, 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        p_id:        visitId,
        p_time_s:    seconds,
        p_scroll:    maxScrollDepth,
        p_clicks:    clickCount,
        p_focused_s: focusedSec
      }),
      keepalive: true
    });
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') updateEngagement();
  });
  window.addEventListener('beforeunload', updateEngagement);

  // ── Go ──────────────────────────────────────────────────
  init();
})();

// ===================================================================
// TRAVEL MAP — Built with D3.js (SVG). No tile/marker alignment issues.
// ===================================================================

// All cities with EXACT [longitude, latitude] for D3 (note: D3 uses [lng, lat])
const cities = [
  { id: 'tel-aviv', name: 'Tel Aviv', lonLat: [34.78, 32.08], group: 'israel' },
  { id: 'sydney', name: 'Sydney', lonLat: [151.21, -33.87], group: 'australia-nz' },
  { id: 'auckland', name: 'Auckland', lonLat: [174.76, -36.85], group: 'australia-nz' },
  { id: 'kathmandu', name: 'Kathmandu', lonLat: [85.32, 27.72], group: 'nepal' },
  { id: 'london', name: 'London', lonLat: [-0.13, 51.51], group: 'london' },
  { id: 'azores', name: 'Azores', lonLat: [-25.50, 37.75], group: 'azores-lisbon' },
  { id: 'lisbon', name: 'Lisbon', lonLat: [-9.14, 38.72], group: 'azores-lisbon' },
  { id: 'new-york', name: 'New York', lonLat: [-74.01, 40.71], group: 'usa' },
  { id: 'phoenix', name: 'Phoenix', lonLat: [-112.07, 33.45], group: 'usa' },
  { id: 'sri-lanka', name: 'Sri Lanka', lonLat: [79.86, 6.93], group: 'sri-lanka-maldives' },
  { id: 'maldives', name: 'Maldives', lonLat: [73.51, 4.18], group: 'sri-lanka-maldives' },
  { id: 'zakopane', name: 'S. Poland', lonLat: [19.95, 49.30], group: 'poland-slovakia' },
  { id: 'tatras', name: 'Slovakia', lonLat: [20.30, 49.06], group: 'poland-slovakia' },
  { id: 'n-spain', name: 'N. Spain', lonLat: [-1.98, 43.32], group: 'spain-france' },
  { id: 'paris', name: 'Paris', lonLat: [2.35, 48.86], group: 'spain-france' },
  { id: 'provence', name: 'Provence', lonLat: [5.45, 43.53], group: 'spain-france' },
  { id: 'athens', name: 'Athens', lonLat: [23.73, 37.98], group: 'greece' },
  { id: 'thessaloniki', name: 'N. Greece', lonLat: [22.94, 40.64], group: 'greece' },
  { id: 'peloponnese', name: 'Peloponnese', lonLat: [22.11, 37.04], group: 'greece' },
  { id: 'rhodes', name: 'Rhodes', lonLat: [28.22, 36.43], group: 'greece' },
  { id: 'berlin', name: 'Germany', lonLat: [13.41, 52.52], group: 'germany-warsaw' },
  { id: 'warsaw', name: 'Warsaw', lonLat: [21.01, 52.23], group: 'germany-warsaw' },
  { id: 'bucharest', name: 'Romania', lonLat: [26.10, 44.43], group: 'romania-slovenia-tuscany' },
  { id: 'ljubljana', name: 'Slovenia', lonLat: [14.51, 46.06], group: 'romania-slovenia-tuscany' },
  { id: 'florence', name: 'Tuscany', lonLat: [11.26, 43.77], group: 'romania-slovenia-tuscany' }
];

const insightGroups = [
  { id: 'israel', name: 'Israel', title: 'Core Operations', insight: 'Building resilient products in the world\'s most dynamic tech ecosystem.', home: true },
  { id: 'australia-nz', name: 'Australia & New Zealand', title: 'Long-Term Planning', insight: 'Success in remote markets requires meticulous logistics and vision.' },
  { id: 'nepal', name: 'Nepal', title: 'High-Altitude Leadership', insight: 'Staying calm and making decisions under extreme physical and mental pressure.' },
  { id: 'london', name: 'London', title: 'Global Connectivity', insight: 'Navigating diverse cultures and international business standards.' },
  { id: 'azores-lisbon', name: 'Azores & Lisbon', title: 'Adaptability', insight: 'Navigating shifting environments with agility and curiosity.' },
  { id: 'usa', name: 'New York & Phoenix', title: 'Market Scale', insight: 'Understanding the velocity and requirements of the US market.' },
  { id: 'sri-lanka-maldives', name: 'Sri Lanka & Maldives', title: 'The Power of Focus', insight: 'Finding clarity and strategic depth in complex environments.' },
  { id: 'poland-slovakia', name: 'South Poland & Slovakia', title: 'Endurance', insight: 'Pushing boundaries in tough terrains—the same mindset needed for long product cycles.' },
  { id: 'spain-france', name: 'N. Spain, Paris & Provence', title: 'Aesthetic Precision', insight: 'Perfection in the details, from gastronomy to UI/UX.' },
  { id: 'greece', name: 'Greece, Rhodes & Peloponnese', title: 'Heritage & Scale', insight: 'Building on solid foundations while scaling for the future.' },
  { id: 'germany-warsaw', name: 'Germany & Warsaw', title: 'Systemic Efficiency', insight: 'Mastering optimization, structure, and operational excellence.' },
  { id: 'romania-slovenia-tuscany', name: 'Romania, Slovenia & Tuscany', title: 'Resourcefulness', insight: 'Discovering growth opportunities in emerging and classic landscapes.' }
];

// Flight paths from Israel
const ISRAEL = [34.78, 32.08];
const flightTargets = [
  [-74.01, 40.71],   // New York
  [151.21, -33.87],  // Sydney
  [85.32, 27.72],    // Kathmandu
  [-0.13, 51.51],    // London
  [73.51, 4.18]      // Maldives
];

// ===================================================================
// D3 MAP INITIALIZATION
// ===================================================================
let projection, path, svg, g, zoom, mapContainer, tooltip;
let activeGroupId = null;
let cachedWorldData = null;
let resizeTimer = null;

function initD3Map() {
  mapContainer = document.getElementById('map-container');
  tooltip = document.getElementById('map-tooltip');
  if (!mapContainer) return;

  const width = mapContainer.clientWidth;
  const height = mapContainer.clientHeight;

  // Natural Earth projection — looks great, no distortion
  projection = d3.geoNaturalEarth1()
    .scale(width / 5.5)
    .translate([width / 2, height / 2]);

  path = d3.geoPath().projection(projection);

  svg = d3.select('#world-map')
    .attr('width', width)
    .attr('height', height);

  g = svg.append('g');

  // Zoom & pan
  zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom);

  // Load world data
  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((world) => {
    cachedWorldData = world;
    const skeleton = mapContainer.querySelector('.map-skeleton');
    if (skeleton) skeleton.remove();
    renderMap(world);
    buildSidebar();
  }).catch(() => {
    const container = document.getElementById('map-container');
    if (container) container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6b7280;font-size:0.9rem;">Map could not be loaded. Please try again later.</div>';
  });
}

function renderMap(world) {
  const land = topojson.feature(world, world.objects.land);
  g.append('g')
    .selectAll('path')
    .data(land.features || [land])
    .join('path')
    .attr('class', 'land')
    .attr('d', path);
  drawFlightPaths();
  drawMarkers();
}

function drawFlightPaths() {
  flightTargets.forEach((target) => {
    const arcGen = d3.geoInterpolate(ISRAEL, target);
    const arcPoints = d3.range(0, 1.01, 0.02).map((t) => arcGen(t));

    const line = d3.line()
      .x((d) => projection(d)[0])
      .y((d) => projection(d)[1])
      .curve(d3.curveBasis);

    g.append('path')
      .datum(arcPoints)
      .attr('class', 'flight-path')
      .attr('d', line);
  });
}

function drawMarkers() {
  cities.forEach((city) => {
    const [x, y] = projection(city.lonLat);
    const group = insightGroups.find((ig) => ig.id === city.group);
    const isHome = group && group.home;

    const markerG = g.append('g')
      .attr('class', `marker-group ${isHome ? 'home-marker' : ''}`)
      .attr('transform', `translate(${x}, ${y})`)
      .style('cursor', 'pointer');

    // Outer glow (subtle)
    markerG.append('circle')
      .attr('class', 'marker-glow')
      .attr('r', isHome ? 8 : 5);

    // Pulse ring (home only)
    markerG.append('circle')
      .attr('class', 'marker-pulse')
      .attr('r', 4);

    // Core dot
    markerG.append('circle')
      .attr('class', 'marker-dot')
      .attr('r', isHome ? 3.5 : 2.5);

    // Hover interactions
    markerG.on('mouseenter', (event) => {
      if (group) showTooltip(event, city.name, group);
      d3.select(event.currentTarget).select('.marker-dot').transition().duration(200).attr('r', 4);
      d3.select(event.currentTarget).select('.marker-glow').transition().duration(200).attr('r', 10).style('opacity', 0.3);
    });

    markerG.on('mouseleave', (event) => {
      hideTooltip();
      const r = isHome ? 3.5 : 2.5;
      const gr = isHome ? 8 : 5;
      d3.select(event.currentTarget).select('.marker-dot').transition().duration(200).attr('r', r);
      d3.select(event.currentTarget).select('.marker-glow').transition().duration(200).attr('r', gr).style('opacity', isHome ? 0.2 : 0.12);
    });

    markerG.on('click', () => {
      if (group) selectGroup(group.id);
    });
  });
}

function showTooltip(event, cityName, group) {
  const rect = mapContainer.getBoundingClientRect();
  const x = event.clientX - rect.left + 15;
  const y = event.clientY - rect.top - 10;

  tooltip.innerHTML = `
    <div class="tooltip-location">${cityName}</div>
    <div class="tooltip-insight-title">${group.title}</div>
    <div class="tooltip-insight-text">${group.insight}</div>
  `;
  tooltip.style.display = 'block';
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';

  // Keep tooltip within bounds
  const tr = tooltip.getBoundingClientRect();
  if (x + tr.width > mapContainer.clientWidth) {
    tooltip.style.left = (x - tr.width - 30) + 'px';
  }
  if (y + tr.height > mapContainer.clientHeight) {
    tooltip.style.top = (y - tr.height) + 'px';
  }
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

function selectGroup(id) {
  activeGroupId = id;
  const groupCities = cities.filter((c) => c.group === id);
  if (groupCities.length === 0) return;

  // Calculate bounding box of all cities in group
  const coords = groupCities.map((c) => projection(c.lonLat));
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);

  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);

  const width = mapContainer.clientWidth;
  const height = mapContainer.clientHeight;

  const dx = (x1 - x0) || 100;
  const dy = (y1 - y0) || 100;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;

  const scale = Math.min(6, 0.8 / Math.max(dx / width, dy / height));
  const translate = [width / 2 - scale * cx, height / 2 - scale * cy];

  svg.transition()
    .duration(1200)
    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

  // Update sidebar
  document.querySelectorAll('.location-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.id === id);
  });
}

function resetMapView() {
  svg.transition()
    .duration(1000)
    .call(zoom.transform, d3.zoomIdentity);
  activeGroupId = null;
  document.querySelectorAll('.location-item').forEach((item) => item.classList.remove('active'));
}

// Wire reset button
const resetBtn = document.querySelector('.map-reset-btn');
if (resetBtn) resetBtn.addEventListener('click', resetMapView);

function buildSidebar() {
  const list = document.getElementById('locationList');
  if (!list) return;

  insightGroups.forEach((group) => {
    const groupCities = cities.filter((c) => c.group === group.id);
    const cityNames = groupCities.map((c) => c.name).join(', ');

    const item = document.createElement('div');
    item.className = 'location-item';
    item.dataset.id = group.id;
    item.innerHTML = `
      <span class="location-dot"></span>
      <div>
        <div class="location-name">${group.name}</div>
        <div class="location-insight-label">${group.title}</div>
        <div class="location-cities">${cityNames}</div>
      </div>
    `;
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('click', () => selectGroup(group.id));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectGroup(group.id);
      }
    });
    list.appendChild(item);
  });
}

// ===================================================================
// SCROLL ANIMATIONS & NAV
// ===================================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.card, .section-heading, .section-badge, .section-sub, .adventure-card, .contact-container').forEach((el) => {
  if (el.classList.contains('map-card')) return;
  el.classList.add('fade-in');
  observer.observe(el);
});

// Smooth scroll nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Mobile menu
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle) {
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Navbar scroll (throttled with rAF)
const navbar = document.querySelector('.navbar');
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      navbar.style.background = window.scrollY > 50
        ? 'rgba(10, 14, 26, 0.95)'
        : 'rgba(10, 14, 26, 0.8)';
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// Init map when travel section is visible
const mapObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initD3Map();
        mapObserver.disconnect();
      }
    });
  },
  { threshold: 0.1 }
);

const travelSection = document.getElementById('travel');
if (travelSection) mapObserver.observe(travelSection);

// Handle resize (debounced, uses cached data)
window.addEventListener('resize', () => {
  if (!svg || !cachedWorldData) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const width = mapContainer.clientWidth;
    const height = mapContainer.clientHeight;
    projection.scale(width / 5.5).translate([width / 2, height / 2]);
    svg.attr('width', width).attr('height', height);
    g.selectAll('*').remove();
    renderMap(cachedWorldData);
  }, 250);
});

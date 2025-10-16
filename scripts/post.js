const POSTS_JSON = '/posts-db.json';

function slugFromPath(){
  const p = window.location.pathname;
  const name = p.substring(p.lastIndexOf('/')+1);
  return name.replace(/\.html$/, '');
}

async function fetchPosts(){
  const res = await fetch(POSTS_JSON);
  if(!res.ok) throw new Error('無法讀取 posts-db.json');
  return res.json();
}

function setText(id, txt){
  const el = document.getElementById(id);
  if(el) el.textContent = txt || '';
}

function setCover(src, alt){
  const el = document.getElementById('post-cover');
  if(el){ el.src = src; el.alt = alt || '' }
}

function formatDate(d){
  try{ return new Date(d).toLocaleDateString(); }catch(e){ return d }
}

function computeGpxStatsFromXml(xml){
  const trkpts = xml.querySelectorAll('trkpt');
  if(!trkpts || trkpts.length < 2) return null;
  const points = [];
  trkpts.forEach(pt=>{
    const lat = parseFloat(pt.getAttribute('lat'));
    const lon = parseFloat(pt.getAttribute('lon'));
    const eleEl = pt.querySelector('ele');
    const ele = eleEl ? parseFloat(eleEl.textContent) : null;
    points.push({lat, lon, ele});
  });
  let dist = 0;
  let minEle = Infinity, maxEle = -Infinity;
  let totalAscent = 0, totalDescent = 0;
  for(let i=1;i<points.length;i++){
    const a = L.latLng(points[i-1].lat, points[i-1].lon);
    const b = L.latLng(points[i].lat, points[i].lon);
    dist += a.distanceTo(b);
    const e1 = points[i-1].ele, e2 = points[i].ele;
    if(e1!=null){ minEle = Math.min(minEle, e1); maxEle = Math.max(maxEle, e1); }
    if(e2!=null){ minEle = Math.min(minEle, e2); maxEle = Math.max(maxEle, e2); }
    if(e1!=null && e2!=null){ const diff = e2 - e1; if(diff>0) totalAscent += diff; else totalDescent += Math.abs(diff); }
  }
  return {distanceMeters: dist, minEle: isFinite(minEle)?minEle:null, maxEle: isFinite(maxEle)?maxEle:null, totalAscent, totalDescent};
}

function renderGpxStats(stats){
  const el = document.getElementById('gpx-stats');
  if(!el || !stats) return;
  const km = (stats.distanceMeters/1000).toFixed(2);
  const minE = stats.minEle!=null?Math.round(stats.minEle)+'m':'N/A';
  const maxE = stats.maxEle!=null?Math.round(stats.maxEle)+'m':'N/A';
  const ascent = stats.totalAscent?Math.round(stats.totalAscent)+'m':'0m';
  el.textContent = `全長 ${km} km · 海拔 ${minE} — ${maxE} · 總上升 ${ascent}`;
  el.setAttribute('aria-hidden', 'false');
}

async function init(){
  const slug = slugFromPath();
  let posts = [];
  try{ posts = await fetchPosts(); }catch(e){ console.error(e); }
  const post = posts.find(p=>p.slug === slug) || posts.find(p=>p.id===slug) || null;

  if(post){
    setText('post-title', post.title);
    setText('post-meta', `${formatDate(post.date)} · ${post.tags?post.tags.join(', '):''}`);
  setCover(post.coverImage || '/images/placeholder.svg', post.title);
  }

  // GPX handling
  if(post && post.gpxFile){
    const mapEl = document.getElementById('gpx-map');
    mapEl.style.display = 'block';

    const map = L.map('gpx-map', {zoomControl:false, attributionControl:false});

    // muted basemap (OpenStreetMap monochrome-like tiles via carto) for magazine aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap, © CARTO'
    }).addTo(map);

    // add scale and zoom in nicer positions
    L.control.scale({position:'bottomleft', metric:true, imperial:false}).addTo(map);
    L.control.zoom({position:'bottomright'}).addTo(map);

    // helper icons for start/end
    const startIcon = L.divIcon({className: 'gpx-start-marker', html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#2b6cb0"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>'});
    const endIcon = L.divIcon({className: 'gpx-end-marker', html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" fill="#38a169"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'});

    // use leaflet-gpx to add GPX track with styled polyline
    try{
      const gpx = new L.GPX(post.gpxFile, {
        async:true,
        polyline_options: {color: '#1f2937', weight: 4, opacity: 0.95, lineCap: 'round'},
        marker_options: {startIconUrl: null, endIconUrl: null, shadowUrl: null}
      }).on('loaded', function(e){
        if(e && e.target && e.target.getBounds){
          map.fitBounds(e.target.getBounds(), {padding: [30,30]});
        }
        // add nicer start/end markers if track points exist
        const layers = e.target.getLayers ? e.target.getLayers() : [];
        // find first and last latlng from track
        try{
          const layer = layers.find(l=>l.getLatLngs);
          if(layer){
            const latlngs = layer.getLatLngs();
            if(latlngs && latlngs.length){
              const start = latlngs[0];
              const end = latlngs[latlngs.length-1];
              L.marker(start, {icon:startIcon}).addTo(map);
              L.marker(end, {icon:endIcon}).addTo(map);
            }
          }
        }catch(e){/* ignore marker errors */}
      }).addTo(map);
    }catch(err){ console.error('leaflet-gpx failed', err); }

    // fetch GPX for stats calculation
    try{
      const res = await fetch(post.gpxFile);
      if(res.ok){
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        const stats = computeGpxStatsFromXml(xml);
        renderGpxStats(stats);
      }
    }catch(err){ console.error('GPX fetch/parse failed', err); }
  }
}

init();

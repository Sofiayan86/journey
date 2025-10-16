const form = {
  repo: document.getElementById('repo'),
  workflow: document.getElementById('workflow'),
  branch: document.getElementById('branch'),
  pat: document.getElementById('pat'),
  title: document.getElementById('title'),
  date: document.getElementById('date'),
  slug: document.getElementById('slug'),
  summary: document.getElementById('summary'),
  coverImage: document.getElementById('coverImage'),
  gpxFile: document.getElementById('gpxFile'),
  location: document.getElementById('location'),
  tags: document.getElementById('tags'),
  content: document.getElementById('content'),
  contentIsMarkdown: document.getElementById('contentIsMarkdown'),
  publish: document.getElementById('publish'),
  preview: document.getElementById('preview'),
  status: document.getElementById('status')
};

function setStatus(txt, isError=false){
  form.status.textContent = txt;
  form.status.style.color = isError ? '#b91c1c' : '';
}

function buildPayload(){
  const metadata = {
    title: form.title.value,
    date: form.date.value || new Date().toISOString().slice(0,10),
    slug: form.slug.value,
    summary: form.summary.value,
    coverImage: form.coverImage.value,
    gpxFile: form.gpxFile.value || null,
    location: (function(){
      const v = form.location.value.trim(); if(!v) return null; const [lat,lng]=v.split(',').map(s=>parseFloat(s.trim())); return {lat,lng};
    })(),
    tags: form.tags.value.split(',').map(s=>s.trim()).filter(Boolean),
    content: form.content.value,
    contentIsMarkdown: form.contentIsMarkdown.checked
  };
  return {ref: form.branch.value, inputs: {post: JSON.stringify(metadata)}};
}

async function triggerWorkflow(){
  const repo = form.repo.value.trim();
  const workflow = form.workflow.value.trim();
  const pat = form.pat.value.trim();
  if(!repo || !workflow || !pat){ setStatus('請填寫 repo、workflow 與 PAT', true); return; }

  const payload = buildPayload();
  setStatus('觸發中...');

  try{
    const url = `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `token ${pat}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if(res.status === 204){ setStatus('已成功觸發 workflow：請到 GitHub Actions 檢視執行狀態'); }
    else{ const text = await res.text(); setStatus('觸發失敗: '+res.status+' '+text, true); }
  }catch(err){ setStatus('Network/Fetch error: '+err.message, true); }
}

function downloadHtmlTemplate(){
  const metaStr = buildPayload().inputs.post;
  const meta = (typeof metaStr === 'string') ? JSON.parse(metaStr) : metaStr;
  // Open a preview in a new window/tab for immediate inspection
  const html = `<!doctype html>\n<html lang=\"zh-Hant\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<title>${escapeHtml(meta.title)} — Journey</title>\n<link rel=\"stylesheet\" href=\"/styles.css\">\n</head>\n<body>\n<main class=\"container\">\n<article>\n<img src=\"${meta.coverImage||'/images/placeholder.svg'}\" alt=\"cover\" style=\"width:100%;height:auto;\">\n<h1>${escapeHtml(meta.title)}</h1>\n<p class=\"post-meta\">${meta.date}</p>\n<div>${meta.content||''}</div>\n</article>\n</main>\n</body>\n</html>`;

  // Render into iframe preview if present
  const iframe = document.getElementById('previewFrame');
  if(iframe && iframe.contentWindow){
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    return;
  }

  // Fallback: download file
  const blob = new Blob([html], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `${form.slug.value || 'post'}.html`; document.body.appendChild(a); a.click(); a.remove();
}

function escapeHtml(str){ if(!str) return ''; return str.replace(/[&<>\"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

form.publish.addEventListener('click', async (e)=>{ e.preventDefault(); await triggerWorkflow(); });
form.preview.addEventListener('click', (e)=>{ e.preventDefault(); downloadHtmlTemplate(); });

// quick helper: auto-fill date
if(!form.date.value) form.date.value = new Date().toISOString().slice(0,10);

// --- Simple client-side admin lock ---
const LOCK_HASH_KEY = 'admin_pw_hash';
const LOCK_SESSION_KEY = 'admin_unlocked';
const overlay = document.getElementById('lockOverlay');
const adminArea = document.getElementById('adminArea');
const lockInput = document.getElementById('lockInput');
const lockAction = document.getElementById('lockAction');
const lockCancel = document.getElementById('lockCancel');
const lockTitle = document.getElementById('lockTitle');

async function sha256Hex(message){
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function showAdmin(){ if(adminArea) adminArea.style.display = ''; if(overlay) overlay.style.display = 'none'; }
function hideAdmin(){ if(adminArea) adminArea.style.display = 'none'; if(overlay) overlay.style.display = ''; }

async function tryUnlock(pw){
  const stored = localStorage.getItem(LOCK_HASH_KEY);
  const h = await sha256Hex(pw||'');
  if(!stored){
    // first-time: set password
    localStorage.setItem(LOCK_HASH_KEY, h);
    sessionStorage.setItem(LOCK_SESSION_KEY, '1');
    showAdmin();
    return true;
  }
  if(h === stored){ sessionStorage.setItem(LOCK_SESSION_KEY, '1'); showAdmin(); return true; }
  return false;
}

lockAction && lockAction.addEventListener('click', async ()=>{
  const v = lockInput.value || '';
  const ok = await tryUnlock(v);
  if(!ok){ lockTitle.textContent = '密碼錯誤，請重試'; setTimeout(()=>{ lockTitle.textContent='解鎖後台' },1800); }
});
lockCancel && lockCancel.addEventListener('click', ()=>{ window.location.href = './'; });

// on load: if session unlocked, show admin, else show overlay
if(sessionStorage.getItem(LOCK_SESSION_KEY) === '1'){
  showAdmin();
}else{
  hideAdmin();
}

// Expose a simple logout for debugging in console: adminLogout();
window.adminLogout = function(){ localStorage.removeItem(LOCK_HASH_KEY); sessionStorage.removeItem(LOCK_SESSION_KEY); hideAdmin(); };

// End lock

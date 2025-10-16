const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function render(){
  const raw = process.env.POST_JSON || '{}';
  let post = {};
  try{ post = JSON.parse(raw); }catch(e){ try{ post = JSON.parse(JSON.parse(raw)); }catch(e2){ post = {}; } }
  const title = post.title || 'Post';
  const slug = post.slug || (title.toLowerCase().replace(/\s+/g,'-'));
  const cover = post.coverImage || '';
  const ws = process.env.GITHUB_WORKSPACE || process.cwd();

  const thumbsDir = path.join(ws, 'images', 'thumbs');
  fs.mkdirSync(thumbsDir, {recursive: true});

  const sizes = [ {w:1200,h:630}, {w:600,h:315}, {w:300,h:157} ];

  const now = new Date();
  const dateStr = post.date || `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const coverUrl = cover && cover.startsWith('/') ? `file://${path.join(ws, cover.replace(/^\//,''))}` : (cover || '');

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <style>
      @font-face{font-family:SiteSerif; src: local('Noto Serif'), local('Georgia');}
      @font-face{font-family:SiteSans; src: local('Inter'), local('Noto Sans'), local('Arial');}
      body{margin:0;font-family:SiteSans, Arial, sans-serif;background:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh}
      .card{width:1200px;height:630px;display:flex;align-items:stretch;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 18px 50px rgba(11,17,32,0.08)}
      .cover{flex:1;background-size:cover;background-position:center;position:relative}
      .overlay{position:absolute;inset:0;background:linear-gradient(90deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.12) 40%)}
      .meta{width:480px;padding:56px;display:flex;flex-direction:column;justify-content:center;background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02))}
      h1{font-family:SiteSerif, Georgia, serif;font-size:52px;line-height:1.02;margin:0 0 8px 0;color:#0b1220}
      .lede{color:#6b7280;margin:0 0 18px 0;font-size:18px}
      .meta-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
      .logo{font-weight:700;color:#111827}
      .date{color:#9ca3af;font-size:14px}
      .brand{font-size:13px;color:#94a3b8;margin-top:12px}
    </style>
  </head>
  <body>
    <div class="card">
      <div class="cover" style="background-image:url('${coverUrl}');">
        <div class="overlay"></div>
      </div>
      <div class="meta">
        <div class="meta-top"><div class="logo">Journey</div><div class="date">${escapeHtml(dateStr)}</div></div>
        <h1>${escapeHtml(title)}</h1>
        <p class="lede">${escapeHtml(post.summary || '')}</p>
        <div class="brand">Travel Magazine • Journey</div>
      </div>
    </div>
  </body>
  </html>
  `;

  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']});
  try{
    const page = await browser.newPage();
    await page.setContent(html, {waitUntil:'networkidle0'});
    for(const s of sizes){
      await page.setViewport({width:s.w, height:s.h});
      const out = path.join(thumbsDir, `${slug}-${s.w}x${s.h}.jpg`);
      await page.screenshot({path: out, type:'jpeg', quality:85, fullPage:false});
      console.log('Wrote', out);
    }
    // also write default slug.jpg as largest
    const defaultOut = path.join(thumbsDir, `${slug}.jpg`);
    fs.copyFileSync(path.join(thumbsDir, `${slug}-1200x630.jpg`), defaultOut);
    console.log('Wrote default thumb', defaultOut);
  }finally{
    await browser.close();
  }
}

function escapeHtml(s){ return String(s||'').replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

render().catch(err=>{ console.error(err); process.exit(1); });

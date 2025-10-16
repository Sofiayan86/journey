const POSTS_JSON = '/posts-db.json';

async function fetchPosts(){
  try{
    const res = await fetch(POSTS_JSON);
    if(!res.ok) throw new Error('無法讀取 posts-db.json');
    const posts = await res.json();
    return posts.sort((a,b)=> new Date(b.date) - new Date(a.date));
  }catch(err){
    console.error(err);
    return [];
  }
}

function renderPostCard(post){
  const a = document.createElement('a');
  a.href = `/posts/${post.slug}.html`;
  a.className = 'post-card';
  a.innerHTML = `
  <img class="post-cover" src="${post.coverImage || '/images/placeholder.svg'}" alt="${escapeHtml(post.title)}">
    <div class="post-body">
      <h3 class="post-title">${escapeHtml(post.title)}</h3>
      <div class="post-meta">${new Date(post.date).toLocaleDateString()} · ${post.tags ? post.tags.join(', ') : ''}</div>
      <p class="post-summary">${escapeHtml(post.summary || '')}</p>
    </div>
  `;
  return a;
}

function escapeHtml(str){
  if(!str) return '';
  return str.replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
}

async function init(){
  const postsEl = document.getElementById('posts');
  const posts = await fetchPosts();
  if(!posts.length){
    postsEl.innerHTML = '<p>目前沒有文章。</p>';
    return;
  }
  posts.forEach(p=>{
    const card = renderPostCard(p);
    postsEl.appendChild(card);
  });
}

init();

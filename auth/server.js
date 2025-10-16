require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// GET /auth/start -> redirect user to GitHub authorize URL
app.get('/auth/start', (req, res) => {
  const client_id = process.env.GH_CLIENT_ID;
  const redirect = process.env.REDIRECT_URI; // e.g. https://yourdomain.com/auth/callback
  const state = Math.random().toString(36).slice(2);
  // NOTE: store state in session or other store in production
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect)}&scope=repo%20workflow&state=${state}`;
  res.redirect(url);
});

// GET /auth/callback?code=... -> exchange code for access_token and redirect back to admin with token
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  if(!code){ return res.status(400).send('missing code'); }

  try{
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: process.env.GH_CLIENT_ID, client_secret: process.env.GH_CLIENT_SECRET, code })
    });
    const json = await tokenRes.json();
    if(json.error) return res.status(500).send(JSON.stringify(json));
    const access_token = json.access_token;
    // redirect back to admin with token in fragment (so it isn't sent to server logs)
    const target = (process.env.ADMIN_UI_BASE || '/journey/admin.html');
    res.redirect(`${target}#gh_token=${access_token}`);
  }catch(err){ res.status(500).send(err.message); }
});

app.listen(PORT, ()=>{ console.log('auth proxy listening on', PORT); });

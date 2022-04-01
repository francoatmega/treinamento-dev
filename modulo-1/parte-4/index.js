const express = require('express')
const axios = require('axios')
const queryString = require('query-string')
const app = express()

app.use(express.json())

let access_token;

const params = queryString.stringify({
  client_id: 'CLIENT_ID',
  redirect_uri: 'http://localhost:3333/authenticate/github',
  scope: ['read:user', 'user:email'].join(' '),
  allow_signup: true,
});

const githubLink = `https://github.com/login/oauth/authorize?${params}`;

app.get('/',async (req, res) => {
    if(access_token) {
        const { data } = await axios({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {
                Authorization: `token ${access_token.access_token}`,
            },
        });
        return res.status(200).send(`
            <img src=${data.avatar_url}>
            <h3>Nick: </h3> ${data.login}
            <h3>Status: </h3> ${data.bio}
        `)
    }
    return res.status(200).send(`<a href=${githubLink}> Login with GitHub </a>`)
})

app.get('/authenticate/github', async (req, res) => {
    const { data } = await axios({
        url: 'https://github.com/login/oauth/access_token',
        method: 'get',
        params: {
          client_id: 'CLIENT_ID',
          client_secret: 'CLIENT_SECRET',
          redirect_uri: 'http://localhost:3333/authenticate/github',
          code: req.query.code,
        },
      });
    access_token = queryString.parse(data);
    res.redirect('/')
})

app.listen(3333, () => { console.log('Listening on port 3333...')})
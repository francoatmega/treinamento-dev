const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.urlencoded({ extended: true }))

const generatedTokens = []

const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
  };

app.post('/v1/oauth/token', (req, res) => {
    if(req.body.client_id === 'pOZpUNjujRit' && req.body.client_secret == 'nprGNHH1mawtYTL0zha3Ob') {
        const token = {
            access_token: randomAlphaNumeric(35),
            token_type: "Bearer",
            expires_in: 60, //SECONDS
            issued_at: Date.now()
        }
        generatedTokens.push(token)
        return res.status(200).json({ token })
    }
    return res.status(401).json({ error: "Unauthenticated" })
})

app.get('/subdepartments', (req, res) => {
    try {
        const [ _, token ] = req.headers.authorization.split(' ')
        const findedToken = generatedTokens.find(item => item.access_token === token)
        const expirationDate = findedToken.issued_at + (findedToken.expires_in * 1000)
        const actualDate = Date.now()
        if(!findedToken || actualDate >= expirationDate) {
            return res.status(401).json({ "error": "token expired" })
        } 
        return res.status(200).json([
            {
                "name": "Subdepartment 1"
            },
            {
                "name": "Subdepartment 2"
            },
            {
                "name": "Subdepartment 3"
            }
        ])
    } catch (err) {
        return res.status(500).json({ "error": "Server internal error"})
    }
})

app.listen(6666, () => { console.log('Listening on port 6666...')})
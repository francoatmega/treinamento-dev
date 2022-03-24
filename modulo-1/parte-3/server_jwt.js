const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

app.use(express.json())

app.get('/authenticate', (req, res) => {
    if(req.body.user === 'jardelmatias@live.com' && req.body.password === '123456') {
        const token = jwt.sign({
            userId: 1,
            role: 'admin'
        }, 'mysecretkey', {
            expiresIn: '1m'
        })
        return res.status(200).json({ token })
    }
    return res.status(401).json({ error: "Unauthenticated" })
})

app.get('/departments', (req, res) => {
    try {
        const [ _, token ] = req.headers.authorization.split(' ')
        jwt.verify(token, 'mysecretkey')
        return res.status(200).json([
            {
                "name": "Department 1"
            },
            {
                "name": "Department 2"
            },
            {
                "name": "Department 3"
            }
        ])
    } catch (err) {
        if (err.message == "jwt expired") {
            return res.status(401).json({ "error": "token expired" })
        }
        return res.status(500).json({ "error": "Server internal error"})
    }
})

app.listen(3333, () => { console.log('Listening on port 3333...')})
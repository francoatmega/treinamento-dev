const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())

app.post('/convertNumberToDollars', async (req, res) => {

    if(req.headers.authorization !== 'Bearer 2b34f19b-46fb-40a0-9dc7-db24db16615a') {
        return res.status(401).json({ 'message': 'Não autenticado'})
    }

    const request = {
        url: 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml'
        },
        data: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">
              <dNum>${req.body.dNum}</dNum>
            </NumberToDollars>
          </soap:Body>
        </soap:Envelope>`
    }

    const response = await axios(request)

    return res.status(200).json({ 'RETORNO': response.data })
})

app.listen(3000, () => { console.log('Listening on port 3000...')})
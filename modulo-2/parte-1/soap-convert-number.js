const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

const parseXMLtoJSON = (data) => {
    const parser = new XMLParser()
    return parser.parse(data)
}

(async () => {

    console.log('Consumindo web service SOAP que converte numeros por extenso...')

    const parameter = '345'
    const path = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso'
    const method = 'POST'
    const header = {
        'Content-Type': 'text/xml; charset=utf-8'
    }
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
          <ubiNum>${parameter}</ubiNum>
        </NumberToWords>
      </soap:Body>
    </soap:Envelope>`

    const retorno = await axios({
        url: path,
        method: method,
        headers: header,
        data: body
    })
    
    const parsedResult = parseXMLtoJSON(retorno.data)

    console.log(`O numero ${parameter} por extenso em ingles é: ${parsedResult['soap:Envelope']['soap:Body']['m:NumberToWordsResponse']['m:NumberToWordsResult']}`)

})()
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

const parseXMLtoJSON = (data) => {
    const parser = new XMLParser()
    return parser.parse(data)
}

(async () => {

    console.log('Consumindo web service SOAP que lista os países...')

    const path = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso'
    const method = 'POST'
    const header = {
        'Content-Type': 'text/xml; charset=utf-8'
    }
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <ListOfCountryNamesByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
        </ListOfCountryNamesByName>
      </soap12:Body>
    </soap12:Envelope>`

    const retorno = await axios({
        url: path,
        method: method,
        headers: header,
        data: body
    })
    
    const parsedResult = parseXMLtoJSON(retorno.data)

    const listOfCountries = parsedResult['soap:Envelope']['soap:Body']['m:ListOfCountryNamesByNameResponse']['m:ListOfCountryNamesByNameResult']['m:tCountryCodeAndName']

    console.log('Há um total de ', listOfCountries.length, ' países na lista.')

    const parsedListOfCountries = listOfCountries.map((item) => {
        return {
            'Código do País': item['m:sISOCode'],
            'Nome do País': item['m:sName'],
        }
    })
    console.log(JSON.stringify(parsedListOfCountries, null, 2))
})()
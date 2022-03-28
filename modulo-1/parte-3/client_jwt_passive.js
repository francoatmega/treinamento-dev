const axios = require('axios');
const jwt = require('jsonwebtoken');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0ODEyMTM2OSwiZXhwIjoxNjQ4MTIxNDI5fQ.3IiYWe0DZJDPVuTks5TjHeK1JHk9IVRO6ygrfzP1gzw';

const requestDataAuth = {
    url: 'http://localhost:3333/authenticate',
    method: 'get',
    data: {
        user: "jardelmatias@live.com",
        password: "123456"
    }
};

const getToken = async () => {
    console.log('Buscando um token novo, pois o atual está expirado.')
    const authData = await axios(requestDataAuth)
    return authData.data.token
}

(async () => {

    setInterval(async () => {

        const requestDataDepartments = {
            url: 'http://localhost:3333/departments',
            method: 'get',
            headers: {
                authorization: 'Bearer ' + token
            }
        };

        let responseDepartments;
        
        try {

            responseDepartments = await axios(requestDataDepartments)

            console.log(responseDepartments.data)

        } catch (err) {

            console.log('Token expirado... ')

            if (err.response.status === 401 && err.response.data.error === 'token expired') {
                token = await getToken()
            }

            console.log(token)
        }
        
    }, 1000)
})()



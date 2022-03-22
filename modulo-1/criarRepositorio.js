const axios = require('axios');

const token = 'SEU_TOKEN_AQUI';

(async () => {
    const request = {
        method: 'post',
        url: 'https://api.github.com/user/repos',
        headers: { 
          'Accept': 'application/vnd.github.v3+json', 
          'Authorization': `Bearer ${token}`
        },
        data: {
            name: "Repositorio de teste ",
            description: "Repositorio de teste via código",
            private: false
        }
      }
    const resposta = await axios(request)
    console.log('Status code de resposta ', resposta.status)
    console.log('Dados da resposta ', resposta.data)
})()
const axios = require('axios');

const owner = 'francoatmega';
const token = 'SEU_TOKEN_AQUI';

(async () => {
    const request = {
        method: 'get',
        url: `https://api.github.com/users/${owner}/repos`,
        headers: { 
          'Accept': 'application/vnd.github.v3+json', 
          'Authorization': `Bearer ${token}`
        }
      }
    const repositorios = await axios(request)
    const nomesRepositorios = repositorios.data.map(item => item.name)
    console.log('Você tem ' + nomesRepositorios.length + ' repositorios no GitHub\n')
    console.log('Seus repositórios: \n')
    nomesRepositorios.forEach(repositorio => {
      console.log('* ' + repositorio + '\n')
    });
    
})()
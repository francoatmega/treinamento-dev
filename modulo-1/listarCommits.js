const axios = require('axios');

const owner = 'francoatmega';
const repository = 'historical-computer-science-articles';
const token = 'SEU_TOKEN_AQUI';

(async () => {
    const request = {
        method: 'get',
        url: `https://api.github.com/repos/${owner}/${repository}/commits`,
        headers: { 
          'Accept': 'application/vnd.github.v3+json', 
          'Authorization': `Bearer ${token}`
        }
      }
    const commits = await axios(request)
    const commitsTratados = commits.data.map(item => item.commit.message)
    console.log('Você tem ' + commitsTratados.length + ' commits no repo ', repository, '\n')
    console.log('Seus commits: \n') 
    commitsTratados.forEach(commit => {
      console.log('* ' + commit + '\n')
    })
    
})()
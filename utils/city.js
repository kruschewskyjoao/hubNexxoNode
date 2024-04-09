import variableOptions from '../config/conf.js';  

const searchCity = async (id) => {
  if(!id) return '';
  const url = `https://sandbox.asaas.com/api/v3/cities?id=${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      access_token: variableOptions.api
    }
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error('Erro ao obter Cidade:', error);
    throw error;
  }
}

export default searchCity;

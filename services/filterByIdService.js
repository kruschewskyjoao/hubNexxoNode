import variableOptions from '../config/conf.js';

const filterByIdService = async (id) => {
  const url = `https://sandbox.asaas.com/api/v3/customers?id=${id}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      access_token: variableOptions.api
    }
  }
  const response = await fetch(url, options);
  if(response.status === 401) throw new Error('Unauthorized');
  const json = await response.json();
  if(json.deleted === true) throw new Error();
  return json;
}

export default filterByIdService;

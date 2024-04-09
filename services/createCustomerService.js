import variableOptions from '../config/conf.js';  

const createCustomerService = async (body) => {
  const url = 'https://sandbox.asaas.com/api/v3/customers';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      access_token: variableOptions.api
    },
    body: JSON.stringify(body)
  };
    const response = await fetch(url, options);
    if(response.status === 401) throw new Error('Unauthorized');
    if(response.status === 400) throw new Error('invalid_cpfCnpj');
    const json = await response.json();
    return json;
}

export default createCustomerService;

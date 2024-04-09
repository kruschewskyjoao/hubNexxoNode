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
    const json = await response.json();
    return json;
}

export default createCustomerService;

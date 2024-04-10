import variableOptions from '../config/conf.js';

const deleteCustomerByIdService = async (id) => {
  const url = `https://sandbox.asaas.com/api/v3/customers?id=${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      access_token: variableOptions.api
    }
  };
  const response = await fetch(url, options);
  if(response.status === 401) throw new Error('Unauthorized');
  const json = await response.json();
  return json;
}

export default deleteCustomerByIdService;

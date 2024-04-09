import variableOptions from '../config/conf.js';

const updateCustomerByIdService = async (id, data) => {
  const url = `https://sandbox.asaas.com/api/v3/customers/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      access_token: variableOptions.api
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if(json.errors || json.deleted === true) throw new Error(json.errors[0].description);
  return json;
}

export default updateCustomerByIdService;

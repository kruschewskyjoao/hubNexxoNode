import variableOptions from '../config/conf.js';

const filterByNameOrCnpjOrCpfController = async (nameOrCnpj) => {
  const url = `https://sandbox.asaas.com/api/v3/customers?name=${nameOrCnpj}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      access_token: variableOptions.api
    }
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if(json.data.length === 0) throw new Error('Nenhum cliente encontrado.');
  return json;
}

export default filterByNameOrCnpjOrCpfController;
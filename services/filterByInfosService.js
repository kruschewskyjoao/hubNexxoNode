import variableOptions from '../config/conf.js';
import isEmail from 'is-email';
import { CPF, CNPJ} from '@julioakira/cpf-cnpj-utils';

const filterByInfosService = async (infos) => {
  let url = 'https://sandbox.asaas.com/api/v3/customers?';
  const buildUrl = [];
  if(isEmail(infos)) {
    buildUrl.push(`email=${infos}`);
  } else if (infos === CPF.Validate(infos) || infos === CNPJ.Validate(infos)) {
    buildUrl.push(`cpfCnpj=${infos}`);
  } else {
    buildUrl.push(`name=${infos}`);
  }
  url += buildUrl.join('&');
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      access_token: variableOptions.api
    }
  };
  const response = await fetch(url, options);
  if(response.status === 401) throw new Error('Unauthorized');
  const json = await response.json();
  if(json.data.length === 0) throw new Error('Nenhum cliente encontrado.');
  return json;
}

export default filterByInfosService;
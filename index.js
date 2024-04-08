import express from 'express';
import variableOptions from './config/conf.js';

const app = express();

app.use(express.json());

const PORT = variableOptions.port || 3000;

const APPJSON = 'application/json';

//Criar nova cobrança
app.post('/newcharge', (req, res) => {
  const url = 'https://sandbox.asaas.com/api/v3/payments';
  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'}
  };
  const { body } = req;
  const newCharge = {
    customer: body.customer,
    billingType: body.billingType,
    value: body.value,
    description: body.description,
    dueDate: body.dueDate,
  };
});

//Listar cobranças de um cliente específico: GET https://api.asaas.com/v3/payments?customer={customer_id}
app.get('/payments/:customer_id', async (req, res) => {
  const url = `https://api.asaas.com/v3/payments?customer={customer_id}`;
  const parsedId = parseInt(req.params.id);
  const options = { 
    method: 'GET',
    headers: { accept: 'application/json' }
    };
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(json);
  return 'oi';
  //const payments = json.filter(payment => payment.customer_id === parsedId);
  //res.send(payments);
});

//Atualizar cliente existente
app.put('/customer/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).send('Nome ou email não informado(s)');
  }
  const url = `https://sandbox.asaas.com/api/v3/customers/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      accept: APPJSON,
      'content-type': APPJSON,
      access_token: variableOptions.api
    },
    body: JSON.stringify({ name, email })
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// filtrar SOMENTE por ID da pessoa.  = feito ? 
app.get('/customer/:id', async (req, res) => {
  const id = req.params.id;
  const url = `https://sandbox.asaas.com/api/v3/customers?id=${id}`
  const options = {
    method: 'GET',
    headers: {
      accept: APPJSON,
      access_token: variableOptions.api
    }
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// filtrar por nome ou cnpj = feito?
//nome: https://api.asaas.com/v3/customers?name=Marcelo
//cnpj: https://api.asaas.com/v3/customers?cpfCnpj=42885229519
app.get('/customers/:nameOrCnpj', async (req, res) => {
  const name = req.params.name;
  const cnpj = req.params.cpfCnpj;
  const url = `https://sandbox.asaas.com/api/v3/customers?nameOrCnpj=${name || cnpj}`;
  const options = {
    method: 'GET',
    headers: {
      accept: APPJSON,
      access_token: variableOptions.api
    }
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Criar novo cliente -- feito ?
app.post('/newcustomer', async (req, res) => {
  const { name, cpfCnpj, postalCode = '' } = req.body;
  if (!name || !cpfCnpj) {
    return res.status(400).send('Nome ou CPF/CNPJ não informado(s)');
  }
  const newCustomer = { name, cpfCnpj, postalCode };
  const url = 'https://sandbox.asaas.com/api/v3/customers';

  const options = {
    method: 'POST',
    headers: {
      accept: APPJSON,
      'content-type': APPJSON,
      access_token: variableOptions.api
    },
    body: JSON.stringify(newCustomer),
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    res.status(201).json(json);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

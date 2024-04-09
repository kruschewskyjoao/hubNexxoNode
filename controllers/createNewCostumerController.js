import createCustomerService from '../services/createCustomerService.js';

const createNewCostumerController = async (req, res) => {
  const { name, cpfCnpj, postalCode = '' } = req.body;
  if (!name) {
    return res.status(400).send('Nome não informado');
  } else if (!cpfCnpj) {
    return res.status(400).send('CPF ou CNPJ não informado(s)');
  }
  try {
    const createNew = await createCustomerService({ name, cpfCnpj, postalCode });
    res.status(200).json(createNew);
  } catch (error) {
    if(error.message === 'invalid_cpfCnpj') {
      return res.status(400).send('O CPF ou CNPJ informado é inválido.')
    } else if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    res.status(500).send('Internal Server Error');
  }
}

export default createNewCostumerController;

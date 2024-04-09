import createCustomerService from '../services/createCustomerService.js';

const createNewCostumerController = async (req, res) => {
  const { name, email, postalCode = '' } = req.body;
  if (!name) {
    return res.status(400).send('Nome não informado');
  } else if (!email) {
    return res.status(400).send('Email não informado');
  }
  try {
    const createNew = await createCustomerService({ name, email, postalCode });
    res.status(201).json(createNew);
  } catch (error) {
    res.status(500).send('Nome ou Email não foram informados');
  }
}

export default createNewCostumerController;

import updateCustomerByIdService from "../services/updateCustomerByIdService.js";
import isEmail from 'is-email';

const updateCustomerByIdController = async (req, res) => {
  const id = req.params.id;
  if(!id) return res.status(400).send('ID não informado');
  const { name, email } = req.body;
  if (email) {
    if(!isEmail) {
      return res.status(400).send('O email informado é inválido.')
    }
  }
  const dataToUpdate = { name, email };
  
  try {
    const response = await updateCustomerByIdService(id, dataToUpdate);
    res.status(201).json(response);
  } catch (error) {
    if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    } else if(error.message === 'O email informado é inválido.') {
      return res.status(400).send(error.message);
    }
    res.status(404).send('Not Found');
  }
}

export default updateCustomerByIdController;

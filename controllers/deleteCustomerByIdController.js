import deleteCustomerByIdService from '../services/deleteCustomerByIdService.js';

const deleteCustomerByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('ID não informado');
  try {
    const filterId = await deleteCustomerByIdService(id);
    res.status(200).json(filterId);
  } catch (error) {
    if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    res.status(404).send('Not Found');
  }
}

export default deleteCustomerByIdController;

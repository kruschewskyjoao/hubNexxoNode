import updateCustomerByIdService from "../services/updateCustomerByIdService.js";

const updateCustomerByIdController = async (req, res) => {
  const id = req.params.id;
  if(!id) return res.status(400).send('ID não informado');
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).send('Nome ou email não informado(s)');
  }

  const dataToUpdate = { name, email };
  
  try {
    const response = await updateCustomerByIdService(id, dataToUpdate);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(404).send('Usuario não encontrado.');
  }
}

export default updateCustomerByIdController;

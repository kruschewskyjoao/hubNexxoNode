import filterByIdService from "../services/filterByIdService.js";

const filterByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('ID não informado');
  try {
    const filterId = await filterByIdService(id);
    res.status(201).json(filterId);
  } catch (error) {
    res.status(404).send('Nenhum cliente encontrado.');
  }
}

export default filterByIdController;

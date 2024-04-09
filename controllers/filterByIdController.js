import filterByIdService from "../services/filterByIdService.js";

const filterByIdController = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('ID não informado');
  if(Object.keys(req.body).length > 0) {
    return res.status(403).send('Você enviou algo no body da requisição, chamadas de método GET precisam ter um body vazio.')
  }
  try {
    const filterId = await filterByIdService(id);
    res.status(200).json(filterId);
  } catch (error) {
    if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    res.status(404).send('Not Found');
  }
}

export default filterByIdController;

import filterByInfosService from "../services/filterByInfosService.js";

const filterByInfosController = async (req, res) => {
  const { infos } = req.params;
  if (!infos) return res.status(400).send('Nome, cnpj , cpj ou email não informado(s).');
  try {
    const filter = await filterByInfosService(infos);
    return res.status(200).json(filter);
  } catch (error) {
    if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    res.status(404).send('Nome, email, cpf ou cnpj não encontrados.');
  }
}

export default filterByInfosController;

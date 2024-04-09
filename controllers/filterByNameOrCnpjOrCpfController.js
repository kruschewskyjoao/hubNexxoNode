import filterByNameOrCnpjService from "../services/filterByNameOrCnpjOrCpfService.js";

const filterByNameOrCnpjOrCpfController = async (req, res) => {
  const { nameOrCnpj } = req.params;
  if (!nameOrCnpj) return res.status(400).send('Nome, CNPJ ou CPF não informado(s)');
  try {
    const filter = await filterByNameOrCnpjService(nameOrCnpj);
    return res.status(200).json(filter);
  } catch (error) {
    if(error.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    res.status(404).send('Nome, Cnpj ou CPF não encontrado.');
  }
}

export default filterByNameOrCnpjOrCpfController;

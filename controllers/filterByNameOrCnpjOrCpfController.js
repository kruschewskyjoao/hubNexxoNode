import filterByNameOrCnpjService from "../services/filterByNameOrCnpjOrCpfService.js";

const filterByNameOrCnpjOrCpfController = async (req, res) => {
  const { nameOrCnpj } = req.params;
  if (!nameOrCnpj) return res.status(400).send('Nome ou CNPJ não informado');
  try {
    const filter = await filterByNameOrCnpjService(nameOrCnpj);
    return res.status(201).json(filter);
  } catch (error) {
    res.status(404).send('Nome, Cnpj ou CPF não encontrado.');
  }
}

export default filterByNameOrCnpjOrCpfController;

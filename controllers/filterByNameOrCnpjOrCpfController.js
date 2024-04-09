import filterByNameOrCnpjService from "../services/filterByNameOrCnpjOrCpfService.js";

const filterByNameOrCnpjOrCpfController = async (req, res) => {
  console.log(req.params)
  const { nameOrCnpj } = req.params;
  if (!nameOrCnpj) return res.status(400).send('Nome, CNPJ ou CPF não informado(s)');
  try {
    const filter = await filterByNameOrCnpjService(nameOrCnpj);
    return res.status(201).json(filter);
  } catch (error) {
    res.status(404).send('Nome, Cnpj ou CPF não encontrado.');
  }
}

export default filterByNameOrCnpjOrCpfController;

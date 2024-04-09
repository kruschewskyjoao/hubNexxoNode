import createNewCustomerController from '../../controllers/createNewCostumerController.js';
import createCustomerService from '../../services/createCustomerService.js';

jest.mock('../../services/createCustomerService.js');

describe('createNewCustomerController', () => {
 it('should return 200 when name and email are informed', async() => {
  const mockCreateCustomer = {
    id: 1,
    name: 'Teste',
    cpfCnpj: '24971563792'
  };

  createCustomerService.mockResolvedValue(mockCreateCustomer);

  const req = {
    body: {
      name: 'Teste',
      cpfCnpj: '24971563792'
    }
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await createNewCustomerController(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(mockCreateCustomer);
 })

 it('should return 400 when name is not informed', async() => {
  const req = {
    body: {
      email: 'email@email.com'
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };

  await createNewCustomerController(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith('Nome não informado');
 });

  it('should return 400 when cpf or email is not informed', async() => {
    const req = {
      body: {
        name: 'Teste'
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  
    await createNewCustomerController(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('CPF ou CNPJ não informado(s)');
  });
});

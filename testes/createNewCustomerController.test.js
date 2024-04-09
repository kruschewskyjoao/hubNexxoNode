import createNewCustomerController from '../controllers/createNewCostumerController.js';
import createCustomerService from '../services/createCustomerService.js';

jest.mock('../services/createCustomerService.js');



describe('createNewCustomerController', () => {
 it('should return 201 when name and email are informed', async() => {
  const mockCreateCustomer = {
    id: 1,
    name: 'Teste',
    email: 'teste@email.com'
  };

  createCustomerService.mockResolvedValue(mockCreateCustomer);

  const req = {
    body: {
      name: 'Teste',
      email: 'teste@email.com'
    }
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  await createNewCustomerController(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
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

  it('should return 400 when email is not informed', async() => {
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
    expect(res.send).toHaveBeenCalledWith('Email não informado');
  });
});

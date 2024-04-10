import updateCustomerByIdController from '../../controllers/updateCostumerByIdController.js';
import updateCustomerByIdService from '../../services/updateCustomerByIdService.js';

jest.mock('../../services/updateCustomerByIdService.js');

describe('updateCustomerByIdController', () => {
  it('should return 400 if Id not informed', async () => {
    const req = {
      params: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await updateCustomerByIdController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('ID não informado');
  });

  it('should return 400 if name or email are not informed', async () => {
    const mockCustomerId = '321123';
    const req = {
      params: {
        id: mockCustomerId,
      },
      body: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await updateCustomerByIdController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Not Found');
  });

  it('should update customer by Id', async () => {
    const mockCostumerId = '71988';
    const mockDataToUpdate = {
      name: 'Joaozinhoinho',
      email: 'Joaozinhoinho@imeio.com'
    };
    const req = {
      params: {
        id: mockCostumerId
      },
      body: mockDataToUpdate
    };
    const mockResponse = {
      id: '71988',
      name: 'Joaozinhoinho',
      email: 'Joaozinhoinho@imeio.com'
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    updateCustomerByIdService.mockResolvedValue(mockResponse);
    await updateCustomerByIdController(req, res);

    expect(updateCustomerByIdService).toHaveBeenCalledWith(mockCostumerId, mockDataToUpdate);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle error if customer not exists', async () => {
    const mockCostumerId = '12397412907401';
    const mockDataToUpdate = {
      name: 'qualquer',
      email: 'qq@email.com'
    };
    const req = {
      params: {
        id: mockCostumerId
      },
      body: mockDataToUpdate
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    const mockError = new Error('Cliente não encontrado');

    updateCustomerByIdService.mockRejectedValue(mockError);
    await updateCustomerByIdController(req, res);

    expect(updateCustomerByIdService).toHaveBeenCalledWith(mockCostumerId, mockDataToUpdate);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Not Found');
  });
  it('should return 401 when service are unauthorized error', async () => {
    const mockCostumerId = '12397412907401';
    const mockDataToUpdate = {
      name: 'qualquer',
      email: 'qq@email.com'
    };
    const req = {
      params: {
        id: mockCostumerId
      },
      body: mockDataToUpdate
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = { message: 'Unauthorized' };
    updateCustomerByIdService.mockRejectedValue(mockError);

    await updateCustomerByIdController(req, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith('Unauthorized');
  });
});

import deleteCustomerByIdController from '../../controllers/deleteCustomerByIdController.js';
import deleteCustomerByIdService from '../../services/deleteCustomerByIdService.js';

jest.mock('../../services/deleteCustomerByIdService.js');

describe('deleteCustomerByIdController', () => {
  it('should return 400 if id not informed', async () => {
    const req = {
      params: {}
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await deleteCustomerByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('ID não informado');
  });

  it('should delete valid customer return 200', async () => {
    const mockCustomerId = '123';
    const req = {
      params: {
        id: mockCustomerId
      }
    };

    const responseDelete = {
      message: 'deleted'
    };

    deleteCustomerByIdService.mockResolvedValue(responseDelete);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await deleteCustomerByIdController(req, res);

    expect(deleteCustomerByIdService).toHaveBeenCalledWith(mockCustomerId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(responseDelete);
  });

  it('should handle error if customer is not found', async () => {
    const mockCustomerId = '123';

    const req = {
      params: {
        id: mockCustomerId
      }
    };

    const mockErrorResponse = new Error('Not Found');

    deleteCustomerByIdService.mockRejectedValue(mockErrorResponse);

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await deleteCustomerByIdController(req, res);

    expect(deleteCustomerByIdService).toHaveBeenCalledWith(mockCustomerId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Not Found');
  });
});

import filterByIdController from '../controllers/filterByIdController.js';
import filterByIdService from '../services/filterByIdService.js';

jest.mock('../services/filterByIdService.js');

describe('filterByIdController', () => {
  it('should return 400 if Id not informed', async () => {
    const req = {
      params: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await filterByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('ID não informado');
  });

  it('should filter by id', async () => {
    const mockCustomerId = '123';
    const req = {
      params: {
        id: mockCustomerId
      }
    };
    const mockResponse = {
      id: '123',
      name: 'Teste',
      email: 'teste@email.com'
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    filterByIdService.mockResolvedValue(mockResponse);
    await filterByIdController(req, res);

    expect(filterByIdService).toHaveBeenCalledWith(mockCustomerId);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle error if customer is not found', async () => {
    const mockCustomerId = '123';
    const req = {
      params: {
        id: mockCustomerId
      }
    };
    const mockError = new Error('Nenhum cliente encontrado');
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    filterByIdService.mockRejectedValue(mockError);
    await filterByIdController(req, res);

    expect(filterByIdService).toHaveBeenCalledWith(mockCustomerId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Nenhum cliente encontrado.');
  });
});

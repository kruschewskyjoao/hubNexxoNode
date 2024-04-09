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

  it('should return 200 when id is provided and service returns data', async () => {
    const mockReq = {
      params: {
        id: '123',
      },
      body: {},
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
      send: jest.fn(),
    };
    const mockData = { id: '123', name: 'Test' };
    filterByIdService.mockResolvedValue(mockData);

    await filterByIdController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockData);
  });


  it('should handle error if customer is not found', async () => {
    const mockCustomerId = '123';
    const req = {
      params: {
        id: mockCustomerId
      },
      body: {},
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
    expect(res.send).toHaveBeenCalledWith('Not Found');
  });
});

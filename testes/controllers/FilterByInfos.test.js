import filterByInfosController from "../../controllers/filterByInfosController.js";
import filterByInfosService from "../../services/filterByInfosService.js";

jest.mock('../../services/filterByInfosService.js');

describe('filterByInfosController', () => {
  it('should return 400 when name cnpj, cpf or email are not provided', async () => {
    const mockReq = {
      params: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await filterByInfosController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Nome, cnpj , cpj ou email não informado(s).');
  });

  it('should return 401 when service are unauthorized error', async () => {
    const mockReq = {
      params: {
        infos: 'Testwwwww',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = { message: 'Unauthorized' };
    filterByInfosService.mockRejectedValue(mockError);

    await filterByInfosController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith('Unauthorized');
  });

  it('should return 200 when infos is provided and service returns data', async () => {
    const mockReq = {
      params: { infos: 'joao'},
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
      send: jest.fn(),
    };
    const mockData = [{ infos: 'joao' }];
    filterByInfosService.mockResolvedValue(mockData);

    await filterByInfosController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockData);
  });
});
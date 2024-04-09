import filterByNameOrCnpjOrCpfController from "../../controllers/filterByNameOrCnpjOrCpfController.js";
import filterByNameOrCnpjOrCpfService from "../../services/filterByNameOrCnpjOrCpfService.js";

jest.mock('../../services/filterByNameOrCnpjOrCpfService.js');

describe('filterByNameOrCnpjOrCpfController', () => {
  it('should return 400 when name cnpj pr cpf are not provided', async () => {
    const mockReq = {
      params: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await filterByNameOrCnpjOrCpfController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Nome, CNPJ ou CPF não informado(s)');
  });

  it('should return 401 when service are unauthorized error', async () => {
    const mockReq = {
      params: {
        nameOrCnpj: 'Testwwwww',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockError = { message: 'Unauthorized' };
    filterByNameOrCnpjOrCpfService.mockRejectedValue(mockError);

    await filterByNameOrCnpjOrCpfController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith('Unauthorized');
  });

  it('should return 200 when nameOrCnpj is provided and service returns data', async () => {
    const mockReq = {
      params: { nameOrCnpj: 'joao'},
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
      send: jest.fn(),
    };
    const mockData = [{ nameOrCnpj: 'joao' }];
    filterByNameOrCnpjOrCpfService.mockResolvedValue(mockData);

    await filterByNameOrCnpjOrCpfController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockData);
  });
});
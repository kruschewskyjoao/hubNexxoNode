import updateCustomerByIdController from "../controllers/updateCostumerByIdController.js";
import updateCustomerByIdService from "../services/updateCustomerByIdService.js";

jest.mock('../services/updateCustomerByIdService.js');

describe('updateCustomerByIdController', () => {
  it('should return 400 id is not informed', async () => {
    const mockReq = {
      params: {},
      body: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await updateCustomerByIdController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('ID não informado');
  });

  it('should return 400 when name or email are empty', async () => {
    const mockReq = {
      params: { id: '123321' },
      body: {},
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await updateCustomerByIdController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Nome ou email não informado(s)');
  });

  it('should return 201 when id name and email are valid and service returns some data', async () => {
    const mockReq = {
      params: { id: '123123' },
      body: { name: 'TestTest', email: 'test1@test.com' },
    };
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
      send: jest.fn(),
    };
    const mockData = { id: '123123', name: 'TestTest', email: 'test1@test.com' };
    updateCustomerByIdService.mockResolvedValue(mockData);

    await updateCustomerByIdController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(mockData);
  });

  it('should return 404 service break', async () => {
    const mockReq = {
      params: { id: '123' },
      body: { name: 'Test', email: 'test@test.com' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    updateCustomerByIdService.mockRejectedValue(new Error());

    await updateCustomerByIdController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Usuario não encontrado.');
  });
});
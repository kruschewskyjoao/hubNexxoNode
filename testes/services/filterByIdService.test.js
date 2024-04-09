import filterByIdService from '../../services/filterByIdService';
import variableOptions from '../../config/conf'; 

global.fetch = jest.fn();

describe('filterByIdService', () => {
  beforeEach(() => {
    global.fetch.mockReset();
  });

  it('should make a GET request', async () => {
    const id = 'cus_000005956749';
    const mockResponse = {
      status: 200,
      json: () => Promise.resolve({ deleted: false }),
    };
    global.fetch.mockResolvedValue(mockResponse);
    variableOptions.api = 'mockAccessToken';

    await filterByIdService(id);

    expect(fetch).toHaveBeenCalledWith(`https://sandbox.asaas.com/api/v3/customers?id=${id}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'access_token': 'mockAccessToken'
      }
    });
  });

  it('should show unauthorized error with 401 status', async () => {
    global.fetch.mockResolvedValue({
      status: 401
    });
    await expect(filterByIdService('cus_000005956749')).rejects.toThrow('Unauthorized');
  });

  it('should show error if customer is deleted and status 200', async () => {
    global.fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ deleted: true }),
    });
    await expect(filterByIdService('cus_000005956749')).rejects.toThrow();
  });
});

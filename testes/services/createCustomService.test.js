import createCustomerService from '../../services/createCustomerService.js';
import variableOptions from '../../config/conf.js';
import returnFromApi from '../../utils/apiNewCostumerResponse.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(returnFromApi),
  })
);

describe('createCustomerService', () => {
  it('should make a POST', async () => {
    const mockBody = { 
      name: 'JOAO',
      cpfCnpj: '24971563792',
    };
    variableOptions.api = 'mockAccessToken';

    const result = await createCustomerService(mockBody);

    expect(fetch).toHaveBeenCalledWith('https://sandbox.asaas.com/api/v3/customers', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'access_token': 'mockAccessToken'
      },
      body: JSON.stringify(mockBody)
    });
    expect(result).toEqual(returnFromApi);
  });

  it('should show unauthorized error for 401 status code', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({ status: 401 }));
    await expect(createCustomerService({})).rejects.toThrow('Unauthorized');
  });

  it('should return invalid_cpfCnpj error for 400 status code', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));
    await expect(createCustomerService({})).rejects.toThrow('invalid_cpfCnpj');
  });
});

import updateCustomerByIdService from '../../services/updateCustomerByIdService.js'; 
import variableOptions from '../../config/conf.js';

describe('updateCustomerByIdService', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should update customer', async () => {
    const id = 'cus_000005956749';
    const updatedCustomerData = {
      name: 'lulita',
      email: 'lulita@imeiou.com',
    };

    const mockResponse = {
      id,
      ...updatedCustomerData,
    };

    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify(mockResponse), {
      status: 200,
    }));
    variableOptions.api = 'mockAccessToken';
    const updatedCustomer = await updateCustomerByIdService(id, updatedCustomerData);

    expect(fetch).toHaveBeenCalledWith(
      `https://sandbox.asaas.com/api/v3/customers/${id}`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          access_token: 'mockAccessToken', 
        },
        body: JSON.stringify(updatedCustomerData),
      }
    );

    expect(updatedCustomer).toEqual(mockResponse);
  });

  it('should return 404 when user not found', async () => {
    const id = '1';
    const updatedCustomerData = {
      name: 'biruliru',
      email: 'biruliru@lulita.com',
    };

    const mockErrorResponse = {
      errors: [{ description: 'Usuario não encontrado.' }],
    };

    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify(mockErrorResponse), {
      status: 404,
    }));
    try {
      await updateCustomerByIdService(id, updatedCustomerData);
    } catch (error) {
      expect(error.message).toBe(mockErrorResponse.errors[0].description);
    }
  });
});

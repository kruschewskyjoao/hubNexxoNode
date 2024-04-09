import express from 'express';
import variableOptions from './config/conf.js'; 
import createNewCostumerController from './controllers/createNewCostumerController.js';
import filterByNameOrCnpjOrCpfController from './controllers/filterByNameOrCnpjOrCpfController.js';
import filterByIdController from './controllers/filterByIdController.js';
import updateCustomerByIdController from './controllers/updateCostumerByIdController.js';
import deleteCustomerByIdController from './controllers/deleteCustomerByIdController.js';

const app = express();
app.use(express.json());
const PORT = variableOptions.port || 3000;

app.post('/newcustomer', createNewCostumerController);
app.get('/customers/:nameOrCnpj', filterByNameOrCnpjOrCpfController);
app.get('/customer/:id', filterByIdController);
app.put('/customer/:id', updateCustomerByIdController);
app.delete('/customers/:id', deleteCustomerByIdController);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { config } from 'dotenv';
config();

const environment = process.env.NODE_ENV || 'development';

const variableOptions = {
  port: process.env.API_PORT || 3000,
  host: process.env.HOST_NAME || 'localhost',
  api: process.env.TOKEN
}

export default {
  ...variableOptions,
}

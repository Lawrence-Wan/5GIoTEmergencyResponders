const dotenv = require("dotenv");
dotenv.config();

const dbDetails = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  url: process.env.DB_URL,
};

const serverConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
};

const wsServerConfig = {
  host: process.env.WS_SERVER_HOST,
  port: process.env.WS_SERVER_PORT,
};

module.exports = {
  dbDeatils: dbDetails,
  production: dbDetails,
  serverConfig: serverConfig,
  secretKey: process.env.SECRET_KEY,
  logLevel: process.LOG_LEVEL,
  encKey: process.env.ENCRYPTION_KEY,
  wsServerConfig: wsServerConfig,
};

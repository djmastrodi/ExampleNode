import { returnCerts } from "./key";

const dataBaseConfig = {
  dataBaseName: process.env.DATABASE_NAME,
  connectionConfig: {
    connectionString: process.env.DOCUMENTDB_URI,
    connectParams: {
      useNewUrlParser: process.env.USE_NEW_URL_PARSER === "true",
      useUnifiedTopology: process.env.USE_UNIFIED_TOPOLOGY === "true",
      ssl: process.env.SSL === "true",
      sslCA: returnCerts(),
      sslValidate: process.env.SSL_VALIDATE === "true",
    },
  },
};

const configurations = {
  dataBaseConfig,
};

export default configurations;

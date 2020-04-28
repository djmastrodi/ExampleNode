
import { Logger } from "../logger/logger";
import { PagintionFilter } from "./pagintionFilter";
import { MongoClient } from "mongodb";
import configurations from "../../config/configurations";

const logger = Logger();

const getConnection = async (
  collectionName: string,
  dbName?: string,
  uri?: string
): Promise<any> => {

  const connectionConfig = {
    connectParams: configurations.dataBaseConfig.connectionConfig.connectParams,
  };

  const connectInstance = await MongoClient.connect(
   uri || configurations.dataBaseConfig.connectionConfig.connectionString,
   connectionConfig.connectParams
  );

  logger.info("Iniciando Conexão com o Banco de Dados...");

  const db = connectInstance.db(
    dbName || configurations.dataBaseConfig.dataBaseName
  );

  const collection = db.collection(collectionName); // Which "collection"/table

  logger.info("Conexão Estabelecida...");

  return collection;
};

export const contextHandler = async (
  collectionName: string,
  dbName?: string,
  uri?: string
) => {
  const context = await getConnection(collectionName, dbName, uri);

  return {
    getAll: async () => {
      logger.info("Buscando todos os registro no banco");
      return await context.find({}).toArray();
    },
    getByFilter: async (filter) => {
      logger.info(
        `Buscando registros de acordo com o filtro ${JSON.stringify(filter)}`
      );
      return await context.find(filter).toArray();
    },
    getOne: async (filter) => await context.findOne(filter),
    addOne: async (data) => await context.insertOne(data),
    addMany: async (array) => {
      logger.info(`Inserindo array: ${JSON.stringify(array)}`);
      return await context.insertMany(array);
    },
    edit: async (filter, item) => await context.updateOne(filter, item,{ upsert: true}),
    delete: async (filter) => await context.deleteOne(filter),
    deleteMany: async (filter) => {
      logger.info(`Deletando Conforme filtro: ${JSON.stringify(filter)}`);
      return await context.deleteMany(filter);
    },
    getPagination: async (paginationfilter: PagintionFilter) => {
      logger.info(
        `Buscando registros de acordo com o filtro ${JSON.stringify(
          paginationfilter.filter
        )}`
      );
      const sort = JSON.parse(
        `{"${paginationfilter.order && "_id"}":${
          paginationfilter.orderType || paginationfilter.orderType === "des"
            ? -1
            : 1
        }}`
      );

      const total = await context.find(paginationfilter.filter).count();
      const skips =
        paginationfilter.pageSize * (paginationfilter.pageNumber - 1);
      const arrayObject = await context
        .find(paginationfilter.filter)
        .skip(skips)
        .limit(paginationfilter.pageSize)
        .sort(sort)
        .toArray();
      const pageCount =
        total % paginationfilter.pageSize === 0
          ? Math.trunc(total / paginationfilter.pageSize)
          : Math.trunc(total / paginationfilter.pageSize) + 1;
      const result = {
        data: arrayObject,
        activePage: paginationfilter.pageNumber,
        pageSize: paginationfilter.pageSize,
        pageCount: pageCount,
        listCount: total,
      };
      return result;
    },
  };
};

export default { contextHandler };

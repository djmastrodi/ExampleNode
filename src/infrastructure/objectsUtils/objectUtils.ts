import { PagintionFilter } from "infrastructure/dataBase/pagintionFilter";

export const getObject = (objectQuery: any, objectT: any): any => {
  let objectResult = {};
  for (var propertyName in objectT) {
    if (typeof objectT[propertyName] === "object") {
      const obj = getObject(objectQuery, objectT[propertyName]);
      if (!isEmpty(obj)) {
        objectResult[propertyName] = obj;
      }
    } else {
      if (typeof objectT[propertyName] === "number") {
        objectResult[propertyName] = parseFloat(objectQuery[propertyName]);
      }
      if (
        isNullUndefinedorNaN(objectResult[propertyName])
      ) {
        delete objectResult[propertyName];
      }
    }
  }
  return objectResult;
};

export const getPaginationFilter = (
  objectQuery: any,
  objectT: any
): PagintionFilter => {
  const obejct = getObject(objectQuery, objectT);

  const pagintionFilter: PagintionFilter = {
    filter: obejct,
    order:
      objectQuery["order"] === undefined
        ? null
        : objectQuery["order"].toString(),
    orderType:
      objectQuery["orderType"] === undefined
        ? null
        : objectQuery["orderType"].toString(),
    pageNumber:
      objectQuery["pageNumber"] === undefined
        ? null
        : parseInt(objectQuery["pageNumber"].toString()),
    pageSize:
      objectQuery["pageSize"] === undefined
        ? null
        : parseInt(objectQuery["pageSize"].toString()),
  };

  return pagintionFilter;
};

export const isEmpty = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

export const isNullUndefinedorNaN = (value: any) => {
  if (value === null) {
    return true;
  } else if (value === undefined) {
    return true;
  } else if (Object.is(value, NaN)) {
    return true;
  }
  return false;
};

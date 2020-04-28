import { contextHandler } from "../../infrastructure";
import { Product, FilterProduct } from "../../models";
import { PagintionFilter } from "infrastructure/dataBase/pagintionFilter";

export default class ProductRepository {
  private DBContext = null;
  
  constructor() { }

  private async initialize(): Promise<void> {
    if (this.DBContext == null) {
      this.DBContext = await contextHandler("product");
    }
  }

  public deleteMany = async (filter: FilterProduct): Promise<any> => {
    await this.initialize();
    return await this.DBContext.deleteMany(filter);
  };

  public delete = async (filter: FilterProduct): Promise<any> => {
    await this.initialize();
    return await this.DBContext.deleteMany(filter);
  };

  public insert = async (items: Product): Promise<Product> => {
    await this.initialize();
    const result = <Product> (await this.DBContext.addOne(items)).ops[0];
    //const product = <Product>result.ops[0];
    return result;
  };

  public insertMany = async (items: Array<Product>): Promise<any> => {
    await this.initialize();
    return await this.DBContext.addMany(items);
  };

  public find = async (filter: any): Promise<Array<Product>> => {
    await this.initialize();
    return await this.DBContext.getByFilter(filter);
  };

  public findPagination = async (filter: PagintionFilter):Promise<any>=>{
    await this.initialize();
    return await this.DBContext.getPagination(filter);
  }

  public getOne = async (filter: FilterProduct): Promise<any> => {
    await this.initialize();
    return await this.DBContext.getOne(filter);
  };

  public update = async (filter: FilterProduct, item: Product): Promise<any> => {
    await this.initialize();
    return await this.DBContext.edit(filter, item);
  };
}

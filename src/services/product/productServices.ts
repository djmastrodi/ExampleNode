import { Product, FilterProduct } from "../../models";
import { ProductRepository } from "../../repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getOne = async (filter: FilterProduct): Promise<Product> => {
    return await this.productRepository.getOne(filter);
  };

  public insertMany = async (items: Array<Product>): Promise<any> => {
    return await this.productRepository.insertMany(items);
  };

  public insert = async (items: Product): Promise<any> => {
    return await this.productRepository.insert(items);
  };

  public update = async (
    filter: FilterProduct,
    item: Product
  ): Promise<any> => {
    return await this.productRepository.update(filter, item);
  };

  public find = async (filter: any): Promise<Array<Product>> => {
    return await this.productRepository.find(filter);
  };

  public findPagination = async (filter: any): Promise<any> => {
    return await this.productRepository.findPagination(filter);
  };

  public deleteMany = async (filter: FilterProduct): Promise<any> => {
    return await this.productRepository.deleteMany(filter);
  };

  public delete = async (filter: FilterProduct): Promise<any> => {
    return await this.productRepository.delete(filter);
  };
}

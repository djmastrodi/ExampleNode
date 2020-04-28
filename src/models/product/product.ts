import { ProductInfo } from "../productInfo/productInfo";

export interface Product {
  codigo: number;
  info: ProductInfo;
  description: string;
  status: string;
}

export interface FilterProduct {
  codigo: number;
  description?: string;
  filter?: string;
}

export const getProduct = (): Product => {
  return {
    codigo: 0,
    info: {
      price: 0,
      discount: 0,
    },
    description: '',
    status: '',
  };
};

import { Request, Response, Router, NextFunction } from "express";
import { ProductService } from "../../services";
import { Product, getProduct } from "../../models";
import { check, validationResult } from "express-validator";
import {
  ResponseSource,
  getPaginationFilter,
} from "../../infrastructure";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async getResponseProduct(request: Request, response: ResponseSource) {
    const filter = getPaginationFilter(request.query, getProduct());
    const products = await this.productService.findPagination(filter);

    response.Ok(products);
  }

  public async post(request: Request, response: ResponseSource) {
    const test = await this.productService.insert(request.body);
    console.log(JSON.stringify(test));
    response.Created(test);
  }
}

export const ProductRouters = (
  router: Router,
  productController: ProductController
) => {
  router.get(
    "/product",
    (request: Request, response: Response, next: NextFunction) => {
      productController
        .getResponseProduct(request, ResponseSource.build(response))
        .catch(next);
    }
  );

  router.post(
    "/product",
    [
      check("description").exists().withMessage("Descrição é obrigatório"),
      check("codigo").exists().withMessage("Código é obrigatório"),
    ],
    (request: Request, response: Response, next: NextFunction) => {
      try {
        validationResult(request).throw();
        productController
          .post(request, ResponseSource.build(response))
          .catch(next);
      } catch (err) {
        response.status(422).json(err);
      }
    }
  );
};

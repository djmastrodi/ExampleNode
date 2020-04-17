import {Request, Response, Router, NextFunction} from 'express';
import { check, validationResult } from 'express-validator';
import {ResponseSource} from '../../infrastructure/response';

export class ProductController {
    public async getResponseProduct(request: Request, response: ResponseSource) {
        console.log('Product name is Fluf')

        response.sendOk();
    }
}

export const ProductRouters = (router: Router, productController: ProductController) => {
    router.get(
        '/product',
        [
           check('name') 
                .not()
                .isString()
                .withMessage('Name must be provided'),
        ],
        (request: Request, response: Response, next: NextFunction) => {
            productController
                .getResponseProduct(request, ResponseSource.build(response))
                .catch(next);
        }
    )
}
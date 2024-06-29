import express, { Request, Response, NextFunction } from 'express';
import { productService } from '../4-services/productsServices';
import { ProductModel } from '../3-models/productModel';
import { StatusCode } from '../3-models/enums';
import { securityMiddleware } from '../6-middleware/security-middleware';
import { fileSaver } from 'uploaded-file-saver';

// product controller - listening to product requiests:
class ProductController {
  // Creating a router object:
  public readonly router = express.Router();

  public constructor() {
    this.router.get(`/products`, this.getAllProducts);
    this.router.get(`/products/:id([0-9]+)`, this.getSpecificProduct);
    this.router.post(
      `/products`,
      securityMiddleware.validateLogin,
      this.addProduct
    );
    this.router.put(
      `/products/:id([0-9]+)`,
      securityMiddleware.validateLogin,
      this.updateProduct
    );
    this.router.delete(
      `/products/:id([0-9]+)`,
      securityMiddleware.validateAdmin,
      this.deleteProduct
    );

    this.router.get('/products/images/:imageName', this.getProductImage);
  }

  // Get all products:
  private async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const products = await productService.getAllProducts();
      response.json(products);
    } catch (error: any) {
      next(error); // Go to catchAll middleware!!!!!!!
    }
  }

  private async getSpecificProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const product = await productService.getSpecificProduct(id);
      response.json(product);
    } catch (error) {
      next(error);
    }
  }
  // Add product
  private async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      request.body.image = request.files?.image;
      const newProduct = new ProductModel(request.body);
      const product = await productService.addProduct(newProduct);
      response.status(StatusCode.Created).json(product);
    } catch (error) {
      next(error);
    }
  }

  private async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      request.body.id = id;
      const product = new ProductModel(request.body);
      const updateProduct = await productService.updateProduct(product);
      response.json(updateProduct);
    } catch (error) {
      next(error);
    }
  }

  private async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await productService.deleteProduct(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error) {
      next(error);
    }
  }

  // Get product image:
  private async getProductImage(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName, true);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
}

export const productController = new ProductController();

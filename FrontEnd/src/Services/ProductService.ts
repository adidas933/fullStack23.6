import axios from 'axios';
import { ProductModel } from '../Models/ProductModel';
import { appConfig } from '../Utils/AppConfig';

class ProductService {
  public async getAllProducts() {
    const response = await axios.get<ProductModel[]>(appConfig.productUrl);
    const products = response.data;
    return products;
  }
}

export const productService = new ProductService();

import { UploadedFile } from 'express-fileupload';
import { ValidationError } from './client-error';

export class ProductModel {
  public id: number;
  public name: string;
  public price: number;
  public stock: number;
  public image: UploadedFile; // Image bytes sent from frontend.

  // Copy Constructor
  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;

    this.image = product.image;
  }

  public validate() {
    if (!this.name) throw new ValidationError('Missing name.');
    if (!this.price) throw new ValidationError('Missing price.');
    if (this.price < 0) throw new ValidationError("Price can't be negative.");
    if (this.price > 1000)
      throw new ValidationError("Price can't exceed 1000.");
    if (this.name.length > 100)
      throw new ValidationError("Name can't be over 100 digits");
  }

  // Joi library can also check for validation error.
}

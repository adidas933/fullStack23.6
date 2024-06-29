import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { ProductModel } from '../3-models/productModel';
import { ResourceNotFoundError } from '../3-models/client-error';
import { fileSaver } from 'uploaded-file-saver';
import path from 'path';

// product service - any logic regarding products:
class ProductService {
  // Get all products:
  public async getAllProducts() {
    // Create sql:
    const sql =
      "SELECT id, name, price, CONCAT('http://localhost:4000/api/products/images/', imageName) as imageUrl FROM products";
    // Execute:
    const products = await dal.execute(sql);
    // Return:
    return products;
  }

  public async getSpecificProduct(id: number) {
    const sql =
      "SELECT id, name, price, concat('http://localhost:4000/api/products/images/', imageName) as imageUrl FROM products WHERE id = ?";
    const products = await dal.execute(sql, [id]);
    const product = products[0];
    if (!product) throw new ResourceNotFoundError(id);

    return product;
  }
  // Add Product
  public async addProduct(product: ProductModel) {
    // Validate
    product.validate();

    // Save image to disk:
    const imageName = await fileSaver.add(
      product.image,
      path.join(__dirname, "../1-assets/images/productsImages/")
    );
 
    // SQL:
    const sql =
      'INSERT INTO products (name, price, stock, imageName) VALUES (?, ?, ?, ?)';

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.stock,
      imageName,
    ]);

    // Get back the db product:
    product = await this.getSpecificProduct(info.insertId);

    // Return:
    return product;
  }

  // Update (PUT)
  public async updateProduct(product: ProductModel) {
    // Validate
    product.validate();
    // SQL
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.id,
    ]);

    if (!info.affectedRows) throw new ResourceNotFoundError(product.id);

    return product;
  }

  public async deleteProduct(id: number) {
    const sql = 'DELETE from products WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (!info.affectedRows) throw new ResourceNotFoundError(id);
  }
}

export const productService = new ProductService();

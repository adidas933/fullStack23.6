import { useEffect, useState } from 'react';
import './ProductList.css';
import { productService } from '../../../Services/ProductService';
import { ProductModel } from '../../../Models/ProductModel';
import { ProductCard } from '../ProductCard/ProductCard';
import { notify } from '../../../Utils/notify';

export function ProductList(): JSX.Element {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    productService
      .getAllProducts()
      .then((data) => setProducts(data))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <div className='ProductList'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

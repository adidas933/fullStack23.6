import { NavLink } from 'react-router-dom';
import './Menu.css';
import { TotalProducts } from '../../ProductArea/TotalProducts/TotalProducts';

export function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/new-product">Add Product</NavLink>
      <NavLink to="/new-employee">Add Employee</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/employees">Employees</NavLink>

      <TotalProducts />
    </div>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom';
import './Routing.css';
import { Home } from '../../HomeArea/Home/Home';
import { ProductList } from '../../ProductArea/ProductList/ProductList';
import { About } from '../../AboutArea/About/About';
import { Page404 } from '../Page404/Page404';
import { EmployeeList } from '../../EmployeesArea/EmployeeList/EmployeeList';
import { AddProduct } from '../../ProductArea/AddProduct/AddProduct';
import { AddEmployee } from '../../EmployeesArea/AddEmployee/AddEmployee';
import { Register } from '../../UserArea/Register/Register';
import { Login } from '../../UserArea/Login/Login';
import { UpdateEmployee } from '../../EmployeesArea/UpdateEmployee/UpdateEmployee';

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/new-product" element={<AddProduct />} />
        <Route path="/new-employee" element={<AddEmployee />} />
        <Route path="/about" element={<About />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

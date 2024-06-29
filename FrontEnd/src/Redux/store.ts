import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ProductModel } from '../Models/ProductModel';
import {
  initProducts,
  addProduct,
  initEmployees,
  initUsers,
  logOutUser,
  addEmployee,
  updateEmployee,
} from './reducers';
import { EmployeeModel } from '../Models/EmployeeModel';
import { UserModel } from '../Models/UserModel';

// Application state
export type AppState = {
  products: ProductModel[];
  employees: EmployeeModel[];
  user: UserModel;
};

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initUsers,
    logOutUser,
  },
});

// Create products slice:
const productSlice = createSlice({
  name: 'products', // Internal use
  initialState: null,
  reducers: { initProducts, addProduct },
});

const employeeSlice = createSlice({
  name: 'employees', // Internal use
  initialState: null,
  reducers: { initEmployees, addEmployee, updateEmployee },
});

// Creating action creators:
export const productActions = productSlice.actions;
export const employeeActions = employeeSlice.actions;
export const userActions = userSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    products: productSlice.reducer, // Product reducers.
    employees: employeeSlice.reducer, // Employee reducers.
    user: userSlice.reducer, // User reducers.
  },
});

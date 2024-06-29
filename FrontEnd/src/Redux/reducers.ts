import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../Models/ProductModel';
import { EmployeeModel } from '../Models/EmployeeModel';
import { UserModel } from '../Models/UserModel';

// Init all products
export function initProducts(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel[]>
) {
  const newState: ProductModel[] = action.payload; //Here, action.payload is all products to init
  return newState;
}

export function initEmployees(
  currentState: EmployeeModel[],
  action: PayloadAction<EmployeeModel[]>
) {
  const newState: EmployeeModel[] = action.payload; //Here, action.payload is all employees to init
  return newState;
}

export function initUsers(
  currentState: UserModel,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload; //Here, action.payload is all products to init
  return newState;
}

// Add product:
export function addProduct(
  currentState: ProductModel[],
  action: PayloadAction<ProductModel>
) {
  const newState: ProductModel[] = [...currentState];
  newState.push(action.payload); // Here action.payload is a product to add
  return newState;
}

export function addEmployee(
  currentState: EmployeeModel[],
  action: PayloadAction<EmployeeModel>
) {
  const newState: EmployeeModel[] = [...currentState];
  newState.push(action.payload); // Here action.payload is an employee to add
  return newState;
}

export function updateEmployee(
  currentState: EmployeeModel[],
  action: PayloadAction<EmployeeModel>
) {
  return currentState.map((employee) =>
    employee.id === action.payload.id ? action.payload : employee
  );
}

export function logOutUser(currentState: UserModel, action: Action) {
  const newState: UserModel = null;

  return newState;
}

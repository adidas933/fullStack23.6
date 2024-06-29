import axios, { AxiosRequestConfig } from 'axios';
import { EmployeeModel } from '../Models/EmployeeModel';
import { appConfig } from '../Utils/AppConfig';
import { employeeActions, store } from '../Redux/store';

class EmployeeService {
  public async getAllEmployees() {
    if (store.getState().employees) return store.getState().employees;

    const response = await axios.get<EmployeeModel[]>(appConfig.employeeUrl);
    const employees = response.data;
    return employees;
  }

  public async addEmployee(employee: EmployeeModel) {
    // Send employee to Backend:
    // send employee file(image) through headers:
    const options: AxiosRequestConfig = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    // the response from axios.post:
    const response = await axios.post<EmployeeModel>(
      appConfig.employeeUrl,
      employee,
      options
    );
    // Don't add that employee to redux if global state is empty:
    if (!store.getState().employees) return;
    // the data of the response:
    const addedEmployee = response.data;
    // Redux: An object with the new employee data.
    const action = employeeActions.addEmployee(addedEmployee);
    // Redux function that sends to Appstate(global state)
    store.dispatch(action);
  }

  public async updateEmployee(employee: EmployeeModel) {
    // Send employee to Backend:
    const id = employee.id;
    const url = `${appConfig.employeeUrl}${id}`;
    // send employee file(image) through headers:
    const options: AxiosRequestConfig = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    // the response from axios.put:
    const response = await axios.put<EmployeeModel>(url, employee, options);
    // Don't add that employee to redux if global state is empty:
    // if (!store.getState().employees) return;
    // the data of the response:
    const updatedEmployee = response.data;
    // Redux: An object with the new employee data.
    const action = employeeActions.updateEmployee(updatedEmployee);
    // Redux function that sends to Appstate(global state)
    store.dispatch(action);
  }
}

export const employeeService = new EmployeeService();

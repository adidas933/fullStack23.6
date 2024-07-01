import express, { Request, Response, NextFunction } from 'express';
import { employeeService } from '../4-services/employeesServices';
import { EmployeeModel } from '../3-models/employeeModel';
import { StatusCode } from '../3-models/enums';
import { fileSaver } from 'uploaded-file-saver';

// employee controller - listening to employee requiests:
class EmployeeController {
  // Creating a router object:
  public readonly router = express.Router();

  public constructor() {
    this.router.get('/employees', this.getAllEmployees);
    this.router.get('/employees/:id', this.getSpecificEmployee);
    this.router.post('/employees', this.postEmployee);
    this.router.put('/employees/:id', this.updateEmployee);
    this.router.delete('/employees/:id', this.deleteEmployee);

    this.router.get('/employees/images/:imageName', this.getEmployeeImage);
  }

  // Get all employees:
  private async getAllEmployees(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const employees = await employeeService.getAllEmployees();
      response.json(employees);
    } catch (error: any) {
      next(error); // Go to catchAll middleware!!!!!!!
    }
  }

  private async getSpecificEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const employee = await employeeService.getSpecificEmployee(id);
      response.json(employee);
    } catch (error) {
      next(error);
    }
  }

  private async postEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      //
      request.body.image = request.files?.image;
      const newEmployee = new EmployeeModel(request.body);
      const employee = await employeeService.postEmployee(newEmployee);
      response.status(StatusCode.Created).json(employee);
    } catch (error) {
      next(error);
    }
  }

  private async updateEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      request.body.id = id;
      const employee = new EmployeeModel(request.body);
      
      const updateEmployee = await employeeService.updateEmployee(employee);
      response.json(updateEmployee);
    } catch (error) {
      next(error);
    }
  }

  private async deleteEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await employeeService.deleteEmployee(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error) {
      next(error);
    }
  }

  // Get product image:
  private async getEmployeeImage(
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

export const employeeController = new EmployeeController();

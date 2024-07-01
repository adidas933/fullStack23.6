import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { EmployeeModel } from '../3-models/employeeModel';
import { ResourceNotFoundError } from '../3-models/client-error';
import { fileSaver } from 'uploaded-file-saver';
import path from 'path';

// employee service - any logic regarding employees:
class EmployeeService {
  // Get all employees:
  public async getAllEmployees() {
    // Create sql:
    const sql =
      "SELECT id, firstName, lastName, CONCAT('http://localhost:4000/api/employees/images/', imageName) as imageUrl FROM employees";
    // Execute:
    const employees = await dal.execute(sql);
    // Return:
    return employees;
  }

  public async getSpecificEmployee(id: number) {
    const sql =
      "SELECT id, firstName, lastName, CONCAT('http://localhost:4000/api/employees/images/', imageName) as imageUrl FROM employees WHERE id = ?";
    const employees = await dal.execute(sql, [id]);
    const employee = employees[0];
    if (!employee) throw new ResourceNotFoundError(id);
    return employee;
  }

  public async postEmployee(employee: EmployeeModel) {
    employee.validateInsert();
    const imageName = await fileSaver.add(
      employee.image,
      path.join(__dirname, '../1-assets/images/employeesImages/')
    );
    // Create sql:
    const sql =
      'INSERT INTO employees (firstName, lastName, imageName) VALUES (?, ?, ?)';
    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      imageName,
    ]);
    // Get back the db employee:
    employee = await this.getSpecificEmployee(info.insertId);
    // Return:
    return employee;
  }

  public async updateEmployee(employee: EmployeeModel) {
    employee.validateUpdate();
    // Save the image file and get the image name
    const imageName = await fileSaver.add(
      employee.image,
      path.join(__dirname, '../1-assets/images/employeesImages/')
    );
    const sql =
      'UPDATE employees SET firstName = ?, lastName = ?, imageName = ? WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      imageName,
      employee.id,
    ]);
    if (!info.affectedRows) throw new ResourceNotFoundError(employee.id);
    return employee;
  }

  public async deleteEmployee(id: number) {
    const sql = 'DELETE from employees WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (!info.affectedRows) throw new ResourceNotFoundError(id);
  }
}

export const employeeService = new EmployeeService();

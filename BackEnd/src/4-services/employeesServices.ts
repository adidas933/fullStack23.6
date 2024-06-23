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
      "SELECT id, firstName, lastName, birthDate, CONCAT('http://localhost:4000/api/employees/images/', imageName) as imageUrl FROM employees";
    // Execute:
    const employees = await dal.execute(sql);
    // Return:
    return employees;
  }

  public async getSpecificEmployee(id: number) {
    const sql =
      "SELECT id, firstName, lastName, birthDate, CONCAT('http://localhost:4000/api/employees/images/', imageName) as imageUrl FROM employees";
    const employees = await dal.execute(sql, [id]);
    const employee = employees[0];
    if (!employee) throw new ResourceNotFoundError(id);

    return employee;
  }

  public async postEmployee(employee: EmployeeModel) {
    employee.validateInsert();

    const imageName = await fileSaver.add(
      employee.image,
      path.join(__dirname, '1-assets/images/employeesImages')
    );

    // Create sql:
    const sql =
      'INSERT INTO employees (firstName, lastName, birthDate, imageName) VALUES (?, ?, ?, ?)';
    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.birthDate,
      imageName,
    ]);

    // Get back the db employee:
    employee = await this.getSpecificEmployee(info.insertId);

    // Return:
    return employee;
  }

  public async updateEmployee(employee: EmployeeModel) {
    employee.validateUpdate();
    const sql =
      'UPDATE employees SET firstName = ?, lastName = ?, birthDate = ? WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.birthDate,
      employee.id,
    ]);
    if (!info.affectedRows) throw new ResourceNotFoundError(employee.id);
    // console.log(info);
    return employee;
  }

  public async deleteEmployee(id: number) {
    const sql = 'DELETE from employees WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (!info.affectedRows) throw new ResourceNotFoundError(id);
  }
}

export const employeeService = new EmployeeService();

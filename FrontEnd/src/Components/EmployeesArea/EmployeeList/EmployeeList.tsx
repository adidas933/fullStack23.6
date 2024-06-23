import { useEffect, useState } from 'react';
import './EmployeeList.css';
import { EmployeeModel } from '../../../Models/EmployeeModel';
import { employeeService } from '../../../Services/EmployeeService';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';

export function EmployeeList(): JSX.Element {
  const [employees, setEmployees] = useState<EmployeeModel[]>([]);

  useEffect(() => {
    employeeService
      .getAllEmployees()
      .then((data) => setEmployees(data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className='EmployeeList'>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

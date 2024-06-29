import { useForm } from 'react-hook-form';
import './AddEmployee.css';
import { useNavigate } from 'react-router-dom';
import { EmployeeModel } from '../../../Models/EmployeeModel';
import { employeeService } from '../../../Services/EmployeeService';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

export function AddEmployee(): JSX.Element {
  const { register, handleSubmit } = useForm<EmployeeModel>();
  const navigate = useNavigate();

  async function send(employee: EmployeeModel) {
    try {
      employee.image = (employee.image as unknown as FileList)[0];
      await employeeService.addEmployee(employee);
      notify.success('Employee has been added.');
      navigate('/employees'); // Navigates to employee page
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className="AddEmployee">
      <form onSubmit={handleSubmit(send)}>
        <label>First Name: </label>
        <input
          type="text"
          {...register('firstName')}
          required
          minLength={2}
          maxLength={100}
        />

        <label>Last Name: </label>
        <input
          type="text"
          {...register('lastName')}
          required
          minLength={2}
          maxLength={100}
        />

        <label>Image: </label>
        <input type="file" accept="image/*" {...register('image')} />

        <button>Add</button>
      </form>
    </div>
  );
}

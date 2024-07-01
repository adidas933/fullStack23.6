import { useForm } from 'react-hook-form';
import './UpdateEmployee.css';
import { EmployeeModel } from '../../../Models/EmployeeModel';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeService } from '../../../Services/EmployeeService';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

export function UpdateEmployee(): JSX.Element {
  const { register, handleSubmit } = useForm<EmployeeModel>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const send = async (employee: EmployeeModel) => {
    try {
      const idNumber = +id;
      employee.id = idNumber;
      console.log(employee);
      employee.image = (employee.image as unknown as FileList)[0];
      await employeeService.updateEmployee(employee);
      notify.success('Employee has been updated');
      navigate('/employees');
    } catch (error: any) {
      console.log(error);
      notify.error(errorHandler.getError(error));
    }
  };

  return (
    <div className="UpdateEmployee">
      <form onSubmit={handleSubmit(send)}>
        <label>First name: </label>
        <input type="text" {...register('firstName')} />

        <label>Last name: </label>
        <input type="text" {...register('lastName')} />

        <label>Image: </label>
        <input type="file" accept="image/*" {...register('image')} />
        <button>Update</button>
      </form>
    </div>
  );
}

import { EmployeeModel } from '../../../Models/EmployeeModel';
import './EmployeeCard.css';

type EmployeeCardProps = {
  employee: EmployeeModel;
};

export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  return (
    <div className='EmployeeCard'>
      <div>
        <span>{props.employee.firstName}</span>
        <span>{props.employee.lastName}</span>
        <span>{props.employee.title}</span>
        <span>{props.employee.city}</span>
        <span>{props.employee.country}</span>
      </div>
      <div>
        <img src={props.employee.imageUrl} alt={props.employee.firstName} />
      </div>
    </div>
  );
}

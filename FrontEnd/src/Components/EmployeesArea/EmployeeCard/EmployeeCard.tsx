import { EmployeeModel } from '../../../Models/EmployeeModel';
import './EmployeeCard.css';

type EmployeeCardProps = {
  employee: EmployeeModel;
};

export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  return (
    <div className='EmployeeCard'>
      <div>
        <p>{props.employee.firstName}</p>
        <p>{props.employee.lastName}</p>
      </div>
      <div>
        <img src={props.employee.imageUrl} alt={props.employee.firstName} />
      </div>
    </div>
  );
}

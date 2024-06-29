import { useNavigate } from 'react-router-dom';
import { EmployeeModel } from '../../../Models/EmployeeModel';
import './EmployeeCard.css';

type EmployeeCardProps = {
  employee: EmployeeModel;
};


export function EmployeeCard(props: EmployeeCardProps): JSX.Element {
  const navigate = useNavigate()
  

  const send = () => {
    const id: number = props.employee.id
    navigate(`/updateEmployee/${id}`)  
  }

  return (
    <div className='EmployeeCard'>
      <div>
        <p>{props.employee.firstName}</p>
        <p>{props.employee.lastName}</p>
      </div>
      <div>
        <img src={props.employee.imageUrl} alt={props.employee.firstName} />
      </div>
      <button onClick={send}>Edit</button>
    </div>
  );
}

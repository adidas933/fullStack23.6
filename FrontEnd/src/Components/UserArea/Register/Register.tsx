import { useForm } from 'react-hook-form';
import { UserModel } from '../../../Models/UserModel';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

export function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success('Welcome ' + user.firstName);
      navigate('/home');
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className="UserList">
      <form onSubmit={handleSubmit(send)}>
        <label>First name: </label>
        <input type="text" {...register('firstName')} />

        <label>Last name: </label>
        <input type="text" {...register('lastName')} />

        <label>Email: </label>
        <input type="email" {...register('email')} />

        <label>Password: </label>
        <input type="password" {...register('password')} />

        <button>Register</button>
      </form>
    </div>
  );
}

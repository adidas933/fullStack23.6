import { useEffect, useState } from 'react';
import './UserList.css';
import { UserModel } from '../../../Models/UserModel';
import { userService } from '../../../Services/UserService';
import { UserCard } from '../UserCard/UserCard';

export function Register(): JSX.Element {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    userService
      .getAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div className='UserList'>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

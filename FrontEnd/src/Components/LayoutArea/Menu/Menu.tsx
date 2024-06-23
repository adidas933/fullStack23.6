import { NavLink } from 'react-router-dom';
import './Menu.css';

export function Menu(): JSX.Element {
  return (
    <div className='Menu'>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/products'>Products</NavLink>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/employees'>Employees</NavLink>
      <NavLink to='/users'>Users</NavLink>
    </div>
  );
}

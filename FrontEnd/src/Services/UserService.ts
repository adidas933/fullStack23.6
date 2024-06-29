import axios from 'axios';
import { appConfig } from '../Utils/AppConfig';
import { UserModel } from '../Models/UserModel';
import { store, userActions } from '../Redux/store';
import { jwtDecode } from 'jwt-decode';
import { CredentialModel } from '../Models/CredentialsModel';

class UserService {
  
  public constructor() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
    const action = userActions.initUsers(dbUser);
    store.dispatch(action);
  }

  public async register(user: UserModel) {
    // Send user to backend
    const response = await axios.post<string>(appConfig.registerUrl, user);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    // send to redux
    const action = userActions.initUsers(dbUser);
    store.dispatch(action);
  }

  public async login(credentials: CredentialModel) {
    // Send credentials to backend:
    const response = await axios.post<string>(appConfig.loginUrl, credentials);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    // Send to redux:
    const action = userActions.initUsers(dbUser);
    store.dispatch(action);
  }

  public logout() {
    localStorage.removeItem('token');
    const action = userActions.logOutUser();
    store.dispatch(action);
  }
}

export const userService = new UserService();

import { OkPacketParams } from 'mysql2';
import { RoleId } from '../3-models/enums';
import { UserModel } from '../3-models/user-model';
import { dal } from '../2-utils/dal';
import { cyber } from '../2-utils/cyber';
import { CredentialModel } from '../3-models/credentialModel';
import { UnauthorizedError } from '../3-models/client-error';

class UserService {
  public async register(user: UserModel) {
    // Validation... להשלים
    // user.validation

    // SQL
    const sql = 'insert into users values(default,?,?,?,?,?)';

    // Set roleId as regular user and not something else:
    user.roleId = RoleId.User;

    // Values:
    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];

    // Execute
    const info: OkPacketParams = await dal.execute(sql, values);

    // Set back id:
    user.id = info.insertId;

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }

  public async login(credentials: CredentialModel) {
    // Validation... להשלים
    // user.validate()

    // SQL
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    // Values:
    const values = [credentials.email, credentials.password];

    // Execute
    const users: OkPacketParams = await dal.execute(sql, values);

    // Extract user:
    const user = users[0];

    // If no user:
    if (!user) throw new UnauthorizedError('Incorrect email or password');

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }
}

export const userService = new UserService();

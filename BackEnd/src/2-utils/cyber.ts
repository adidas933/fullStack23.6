import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel } from '../3-models/user-model';
import { RoleId } from '../3-models/enums';

class Cyber {
  // Secret key:
  private secretKey = 'TheAmazing4578-99Students!';

  // Generate new JWT token:
  public generateNewToken(user: UserModel): string {
    // Remove password:
    delete user.password;

    // User container:
    const container = { user };

    // Expires:
    const options: SignOptions = { expiresIn: '3h' };

    // Secret key:
    const secretKey = 'TheAmazing4578-99Students!';

    // Generate:
    const token = jwt.sign(container, secretKey, options);

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      // if no token:
      if (!token) return false;

      // verify token:
      jwt.verify(token, this.secretKey);

      // token valid:
      return true;
      
    } catch (err: any) {
      //token not valid
      return false;
    }
  }

  // Is user admin:
  public isAdmin(token: string): boolean {
    try {
      // Extract container object from token:
      const container = jwt.decode(token) as { user: UserModel };

      // Extract user from container:
      const user = container.user;

      // Return true if user is admin, or false if not:
      return user.roleId === RoleId.Admin;
    } catch (error: any) {
      return false;
    }
  }
}

export const cyber = new Cyber();

import { RoleId } from "./enums";

export class UserModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roleId: RoleId,
  ) {}
}

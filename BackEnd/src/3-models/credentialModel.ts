export class CredentialModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialModel) {
    this.email = user.email;
    this.password = user.password;
  }
  // add validation later...
}

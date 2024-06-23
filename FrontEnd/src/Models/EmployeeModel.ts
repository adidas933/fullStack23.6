export class EmployeeModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public title: string,
    public country: string,
    public city: string,
    public birthDate: string,
    public imageUrl: string
  ) {}
}

import { UploadedFile } from 'express-fileupload';
import { ValidationError } from './client-error';
import Joi from 'joi';
export class EmployeeModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public birthDate: string;
  public image: UploadedFile; 

  private static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    birthDate: Joi.string().isoDate().required(),
  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    birthDate: Joi.string().isoDate().required(),
  });

  public constructor(employee: EmployeeModel) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.birthDate = employee.birthDate;
    this.image = employee.image;
  }

  public validateInsert(): void {
    const result = EmployeeModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  // Validating current object against the update schema:
  public validateUpdate(): void {
    const result = EmployeeModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

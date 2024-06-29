import { UploadedFile } from 'express-fileupload';
import { ValidationError } from './client-error';
import Joi from 'joi';
export class EmployeeModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public image: UploadedFile; 

  private static insertValidationSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    image: Joi.object()

  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    image: Joi.object()
  });

  public constructor(employee: EmployeeModel) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
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

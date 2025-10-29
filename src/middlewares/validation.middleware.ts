import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../exceptions/index';
import { HttpExceptionHandler } from '../exceptions/http-handler.exception';

export function ValidationMiddleware<T extends object>(targetClass: ClassConstructor<T>) {
   return async (req: Request, _res: Response, next: NextFunction) => {
      const instance = plainToInstance(targetClass, req.body);
      const errors = validateSync(instance, {
         forbidUnknownValues: true,
         validationError: {
            target: false
         }
      });
      const fieldsErrors: { [name: string]: { message: string; value: string } } = {};

      if (errors.length > 0) {
         errors.forEach(error => {
            if (error.constraints) {
               fieldsErrors[error.property] = {
                  message: Object.values(error.constraints).join(', '),
                  value: error.value
               };
            }
            if (error.children) {
               error.children.forEach(errorNested => {
                  if (errorNested.constraints) {
                     fieldsErrors[errorNested.property] = {
                        message: Object.values(errorNested.constraints!).join(', '),
                        value: errorNested.value
                     };
                  }
               })
            }
         });
         new HttpExceptionHandler(_res, new ValidationException("validation failed", fieldsErrors), {})
         return;
      }
      next();
   };
}
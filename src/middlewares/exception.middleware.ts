import { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { HttpException, HttpExceptionHandler } from '../exceptions/http-handler.exception';
import { GenericException, ValidationException } from '../exceptions';
import { ValidateError } from 'tsoa';

export default function ExceptionMiddleware(err: HttpException, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {

     if(err.constructor.name === 'ValidateError') {
        const ve = err as unknown as ValidateError;
        new HttpExceptionHandler(res, new ValidationException('validation error', ve?.fields), {});
        return;
    }  
    
    if(err.constructor.name !== 'Error') {
        new HttpExceptionHandler(res, err, {});
        return;
    }  

    new HttpExceptionHandler(res, new GenericException(err), {});
}

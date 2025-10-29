import { Response } from "express";
import NotFoundException from "./not-found.exception";
import ServiceException from "./service.exception";
import GenericException from "./generic.exception";

type HttpException = ServiceException | NotFoundException | GenericException;

class HttpExceptionHandler {
    constructor(response: Response, exception: HttpException, { otherDetails = {} }) {

        const errorResponse = {
            code: exception.code,
            message: exception.message,
            stack: exception.stack,
            innerException: exception.innerException ? {
                name: exception.innerException.name,
                message: exception.innerException.message,
                stack: exception.innerException.stack,
            } : null,
            ...otherDetails,
        };

        response.status(exception.httpStatus).json(errorResponse);
    }
}

export { HttpExceptionHandler, HttpException };
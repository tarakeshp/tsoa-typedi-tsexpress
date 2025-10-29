import BaseException from "./base.exception";

export default class NotFoundException extends BaseException {  
    constructor(code: string, message: string, innerException: Error | null = null) {  
        super(message);  
        this.name = "NotFoundException";
        this.httpStatus = 404;
        this.code = code;
        this.innerException = innerException;
    }  
}
import BaseException from "./base.exception";

export default class GenericException extends BaseException {  
    constructor(innerException: Error | null = null) {  
        super("an unexpected error has occurred on the server side. please try after sometime.");  
        this.name = "GenericException";
        this.httpStatus = 500;
        this.code = "SERVER_ERROR";
        this.innerException = innerException;
    }  
}
export default class BaseException extends Error {
    public httpStatus: number;
    public code: string;
    public innerException: Error | null = null;  
    constructor(message: string) {  
        super(message);  
        this.name = "BaseException";
        this.httpStatus = 500;
        this.message = message;
        this.code = "BASE_EXCEPTION";
        this.stack = (new Error()).stack;
        this.innerException = null;
    }  
}
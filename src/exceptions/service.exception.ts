import BaseException from "./base.exception";

export default class ServiceException extends BaseException {
    origin: string;
    constructor(code: string, message: string, options: { origin?: string; httpStatusCode?: number; innerException?: Error | null } = {}) {
        const { httpStatusCode, innerException = null } = options;
        super(message);
        this.name = "ServiceException";
        this.httpStatus = httpStatusCode || 500;
        this.code = code;
        this.innerException = innerException;
        this.origin = options.origin || "ExternalService";
    }
}
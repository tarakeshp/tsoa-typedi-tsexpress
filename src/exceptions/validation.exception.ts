import BaseException from "./base.exception";

export default class ValidationException extends BaseException {
    public fields: { [name: string]: { message: string; value: string } };
    constructor(message: string, fields: any) {
        message = (Object.values(fields) as any).map(x => x.message.replace(/'/g, "")).join(', ');

        super(message);
        this.name = "ValidationException";
        this.httpStatus = 400;
        this.fields = fields;
        this.code =  "VALIDATION_ERROR";
    }
}
import { Request } from 'express';

interface HttpRequestContext {
    user: {
        id: string;
    },
}

export default interface Requestx extends Request {
    requestId?: string;
    context?: HttpRequestContext
}

export { Requestx, HttpRequestContext }
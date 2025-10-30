import pino from 'pino';
import asyncLocalStorage from "./async-hook";
import { Requestx } from '../types';

const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: `app.log` },
});

let settings: any = {
    level: process.env.LOG_LEVEL || 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
};

if (process.env.LOG_FORMAT === 'flat') {
    settings.transport = {
        target: 'pino-pretty',
        options: {
            translateTime: "SYS:standard"
        }
    }
}

const _pino = pino(settings, process.env.LOG_TYPE === 'file' ? fileTransport : null);
const _formatters = {

    log: (obj: any) => {
        const store: any = asyncLocalStorage.getStore();
        if (store && store.requestId) {
            obj.requestId = store.requestId;
        }
        return obj
    }
}


const Logger = (module: string = 'app') => {
    return _pino.child({
        module,
    }, {
        formatters: _formatters
    });
}

const HttpLogger = (module: string = 'http') => {
    return _pino.child({ module }, {
        formatters: _formatters
    });
}

const DbLogger = (module: string = 'db') => {
    return _pino.child({ module });
}

export default Logger;
export { Logger, HttpLogger, DbLogger }
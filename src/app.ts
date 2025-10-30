import express, { json, urlencoded, Response, Request } from 'express';
import swaggerUi from "swagger-ui-express";
import pinoHTTP from 'pino-http';
import ExceptionMiddleware from './middlewares/exception.middleware';
import asyncLocalStorage from "./core/async-hook";
import { HttpLogger } from './core/logger';
import { RegisterRoutes } from "./routes/routes";
import { Requestx } from './types';

const app = express();
const logger = HttpLogger();

/* 
  0. Generate unique RequestId for each HttpRequest 
     and use asyncLocalStorage to store and propagate in the other layers
*/
app.use((req: Requestx, Response, next: Function) => {
  req.requestId = Date.now().toString() // Assign a unique ID to the request object
  asyncLocalStorage.run({ requestId: req.requestId }, () => {
    next();
  });
});

/* 
  1. use ping base logger injected to pinoHttp to log http request
*/
app.use(
  pinoHTTP({
    logger
  })
);

/* 
  2. express urlencoded middleware
*/
app.use(
  urlencoded({
    extended: true,
  })
);

/* 
  3. express json bodyParser middleware
*/
app.use(json());

/* 
  4. swagger middleware to generate swagger doc
*/
app.use("/swagger", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(
    swaggerUi.generateHTML(await import("./swagger/swagger.json"))
  );
});

/* 
  5. register app routes
*/
RegisterRoutes(app);

/* 
  N. express error middleware
*/
app.use(ExceptionMiddleware);

export default app;

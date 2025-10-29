import express, { json, urlencoded, Response as response, Request as request } from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import ExceptionMiddleware from './middlewares/exception.middleware';

const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use("/swagger", swaggerUi.serve, async (_req: request, res: response) => {
  return res.send(
    swaggerUi.generateHTML(await import("./swagger/swagger.json"))
  );
});

RegisterRoutes(app);

app.use(ExceptionMiddleware);

export default app;

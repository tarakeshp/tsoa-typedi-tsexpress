import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Response,
    Middlewares
} from "tsoa";
import { Service } from "typedi";
import { HttpException } from "../exceptions/http-handler.exception";
import ExceptionService from "../services/exception.service";

@Service()
@Route("exception")
export class ExceptionController extends Controller {
    constructor(private exceptionService: ExceptionService) {
        super();
    }

     @Get("/")
    public async applyException(@Query() name: string): Promise<string | HttpException | Error> {
        if(name === 'notfound') {
            return this.exceptionService.NotFoundError();
        } else if(name === 'service') {
            return this.exceptionService.ServiceError();
        } else {
            throw new Error("No Exception Applied");
        }
    }
}

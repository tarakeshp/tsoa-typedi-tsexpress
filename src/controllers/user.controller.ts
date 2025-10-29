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
import { CreateUserDto } from "../dto/create-user.dto";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

@Service()
@Route("user")
export class UserController extends Controller {
    constructor() {
        super();
    }

    @Response(200, "Success")
    @Post("")
    @Middlewares([ValidationMiddleware(CreateUserDto)])
    public async createUser(@Body() user: CreateUserDto): Promise<CreateUserDto> {
        return user;
    }
}

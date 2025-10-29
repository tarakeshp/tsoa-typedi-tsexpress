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
} from "tsoa";
import { Service } from "typedi";
import PingService from "../services/ping.service";


@Service()
@Route("ping")
export class PingController extends Controller {
    constructor(private pingService: PingService) {
        super();
    }

    @Response(200, "Success")
    @Get("/")
    public async getPing(): Promise<string> {
        return this.pingService.ping();
    }
}

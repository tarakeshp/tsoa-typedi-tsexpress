import { Service } from "typedi";
import Logger from '../core/logger';
import ExtService from "../integrations/ext.service";

const logger = Logger('ping-service');
@Service()
export default class PingService {
    constructor(private extService: ExtService) {}
    public ping(): string {
        logger.info("calling service method");
        return this.extService.getUserData()[0];
    }
}
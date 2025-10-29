import { Service } from "typedi";
import ExtService from "../integrations/ext.service";

@Service()
export default class PingService {
    constructor(private extService: ExtService) {}
    public ping(): string {
        return this.extService.getUserData()[0];
    }
}
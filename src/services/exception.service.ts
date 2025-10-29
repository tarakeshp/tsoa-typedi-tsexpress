import { Service } from "typedi";
import { NotFoundException, ServiceException } from "../exceptions/index";

@Service()
export default class ExceptionService {
    constructor() {}

    public NotFoundError(): string {
        throw new NotFoundException("USER_NOT_FOUND", "The requested user was not found.");
    }

    public ServiceError(): string {
        throw new ServiceException("USER_SERVICE_ERROR", "An error occurred while fetching user data.");
    }
}
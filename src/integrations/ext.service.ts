import { Service } from "typedi";

@Service()
export default class ExtService {
    public getUserData(): Array<string> {
        return ['pong'];
    } 
}
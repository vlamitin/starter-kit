import qs from "qs";
import BaseService, { POST } from "./base-service";

export default class AuthService extends BaseService {

    constructor(serverURL, routes, accessToken) {
        super(serverURL, routes, accessToken);
    }

    login(username, password) {
        let config = {
            method: POST,
            route: this.routes.login,
            headers: {
                'Authorization': 'Basic',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({ username, password })
        };
        return this.send(config);
    }
}

import AuthService from "./auth-service";

export const AUTH_SERVICE = "authService";

class ServiceLocator {

    services = new Map();
    apiURL;
    routes;

    saveSettings = (settings) => {
        let { routes, apiHost, apiPort } = settings;
        this.apiURL = this.getServerURL(apiHost, apiPort);
        this.routes = routes;
        this.setServices();
    };

    getService = (name) => {
        return this.services.get(name);
    };

    setServices(accessToken) {
        this.services.set(AUTH_SERVICE, new AuthService(this.apiURL, this.routes, accessToken));
    }

    getServerURL(host, port) {
        let defaultHost = host || window.location.hostname;
        let defaultPort = parseFloat(port) || window.location.port;
        return `${window.location.protocol}//${defaultHost}:${defaultPort}`;
    }
}

export const serviceLocator = new ServiceLocator();

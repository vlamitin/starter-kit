import axios from "axios";
import i18next from "i18next";

export const GET = 'get';
export const POST = 'post';
export const PATCH = 'patch';
export const DELETE = 'delete';
export const PUT = 'put';

const RESPONSE_STATUS_ERROR = 'RESPONSE_STATUS_ERROR';

export default class BaseService {

    constructor(serverURL, routes, accessToken) {
        this.serverURL = serverURL;
        this.routes = routes;
        this.accessToken = accessToken;
    }

    send(config) {
        let { method, route, data, params, headers, responseType } = config;
        return new Promise((resolve, reject) => {
            let url = this.serverURL + route;
            let axiosConfig = this.getConfig(url, method, data, params, responseType);
            let instance = this.getInstance(headers);
            return instance(axiosConfig)
                .then((response) => {
                    let { status, data: responseData } = response;
                    if (status > 227) {
                        let statusMessage = i18next.t('common.badServerStatus', { status });
                        let serverMessage = responseData.message || responseData.error || "";
                        let error = new Error();
                        error.name = RESPONSE_STATUS_ERROR;
                        error.message = `${statusMessage}${serverMessage ? ': ' + serverMessage : ''}`;
                        error.status = status;

                        reject(error);
                    } else {
                        resolve(responseData);
                    }
                })
                .catch(reject);
        });
    }

    getInstance(customHeaders = {}) {
        let headers = {
            ...customHeaders,
            Authorization: customHeaders.Authorization || `Bearer ${this.accessToken}`
        };
        return axios.create({ headers });
    }

    getConfig(url, method, data, params, responseType) {
        let config = {
            method,
            url,
            validateStatus(status) {
                return status < 527;
            }
        };
        if (data) {
            config.data = data;
        }
        if (params) {
            config.params = params;
            config.paramsSerializer = (paramsForSerializer) => paramsForSerializer;
        }
        if (responseType) {
            config.responseType = responseType;
        }
        return config;
    }
}

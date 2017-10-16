import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";

import BaseService from "./base-service";

let routes = {
    login: '/uaa/oauth/token'
};

describe('BaseService', () => {
    let baseService;

    beforeEach(() => {
        baseService = new BaseService('serverURL', routes, 'accessToken');
    });

    describe('send', () => {
        let config = {
            method: 'post',
            route: '/uaa/oauth/token',
            headers: {
                'Authorization': 'Basic YnJvd3Nlcjo=',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username=login&password=password&scope=ui&grant_type=password'
        };

        describe('if response status is <= 227', () => {
            let serviceStub;

            beforeEach(() => {
                serviceStub = sinon.stub(baseService, 'getInstance')
                    .returns(() => Promise.resolve({ status: 200, data: 'responseData' }));
            });

            afterEach(() => {
                serviceStub.reset();
            });

            it('calls axios instance config and returns its payload.data', () => {
                return baseService.send(config)
                    .then((payload) => {
                        expect(payload).to.equal('responseData');
                    });
            });
        });

        describe('if response status is > 227', () => {
            let serviceStub;

            beforeEach(() => {
                serviceStub = sinon.stub(baseService, 'getInstance')
                    .returns(() => Promise.resolve({ status: 404, data: { message: 'not found' } }));
            });

            afterEach(() => {
                serviceStub.reset();
            });

            it('rejects an error', () => {
                return baseService.send(config)
                    .catch((error) => {
                        expect(error.name).to.equal('RESPONSE_STATUS_ERROR');
                        expect(error.message).to.equal('Сервер вернул статус 404: not found');
                        expect(error.status).to.equal(404);
                    });
            });
        });

        describe('if an error during request occurred', () => {
            let serviceStub;

            beforeEach(() => {
                serviceStub = sinon.stub(baseService, 'getInstance')
                    .returns(() => Promise.reject(new Error('some error message')));
            });

            afterEach(() => {
                serviceStub.reset();
            });

            it('rejects that error', () => {
                return baseService.send(config)
                    .catch((error) => {
                        expect(error instanceof Error).to.equal(true);
                        expect(error.message).to.equal('some error message');
                    });
            });
        });
    });

    describe('getInstance', () => {
        beforeEach(() => {
            sinon.spy(axios, "create");
        });

        afterEach(() => {
            axios.create.restore();
        });

        describe('if Authorization header given', () => {
            it('calls axios.create with given custom headers and given authorisation header', () => {
                baseService.getInstance({ header1: '12', header2: '34', Authorization: 'Authorization' });
                let expectedConfig = {
                    headers: {
                        header1: '12',
                        header2: '34',
                        Authorization: 'Authorization'
                    }
                };
                expect(axios.create.calledOnce).to.equal(true);
                expect(axios.create.args[0][0]).to.eql(expectedConfig);
            });
        });

        describe('if Authorization header not given', () => {
            it('calls axios.create with given custom headers and "Bearer " + this.accessToken', () => {
                baseService.getInstance({ header1: '12', header2: '34' });
                let expectedConfig = {
                    headers: {
                        header1: '12',
                        header2: '34',
                        Authorization: 'Bearer accessToken'
                    }
                };
                expect(axios.create.calledOnce).to.equal(true);
                expect(axios.create.args[0][0]).to.eql(expectedConfig);
            });
        });
    });

    describe('getConfig', () => {
        describe('if none of [data, params, responseType] given', () => {
            it('returns simple config object', () => {
                let result = baseService.getConfig('/menu', 'get');
                expect(result.method).to.equal('get');
                expect(result.url).to.equal('/menu');
                expect(result.validateStatus).to.be.a('function');
            });
        });
        describe('if also data provided', () => {
            it('returns config object with given data prop', () => {
                let result = baseService.getConfig('/menu', 'get', { prop: 'value' });
                expect(result.method).to.equal('get');
                expect(result.url).to.equal('/menu');
                expect(result.data).to.eql({ prop: 'value' });
                expect(result.validateStatus).to.be.a('function');
            });
        });
        describe('if also params provided', () => {
            it('returns config object with given params and paramsSerializer', () => {
                let result = baseService.getConfig('/menu', 'get', { prop: 'value' }, 'foo=bar');
                expect(result.method).to.equal('get');
                expect(result.url).to.equal('/menu');
                expect(result.data).to.eql({ prop: 'value' });
                expect(result.params).to.equal('foo=bar');
                expect(result.paramsSerializer).to.be.a('function');
                expect(result.validateStatus).to.be.a('function');
            });
        });
        describe('if also responseType provided', () => {
            it('returns config object with given responseType', () => {
                let result = baseService.getConfig('/menu', 'get', { prop: 'value' }, 'foo=bar', 'text');
                expect(result.method).to.equal('get');
                expect(result.url).to.equal('/menu');
                expect(result.data).to.eql({ prop: 'value' });
                expect(result.params).to.equal('foo=bar');
                expect(result.paramsSerializer).to.be.a('function');
                expect(result.validateStatus).to.be.a('function');
                expect(result.responseType).to.equal('text');
            });
        });
    });
});

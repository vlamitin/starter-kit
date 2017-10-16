import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import AuthService from "./auth-service";

let routes = {
    login: '/uaa/oauth/token'
};

describe('AuthService', () => {
    let authService;
    let serviceStub;

    beforeEach(() => {
        authService = new AuthService('serverURL', routes, 'accessToken');
        serviceStub = sinon.stub(authService, 'send');
        serviceStub.returns(Promise.resolve('payload'));
    });

    afterEach(() => {
        serviceStub.reset();
        authService.send.restore();
    });

    describe('login', () => {
        it('calls super send method with proper config and returns its payload', () => {
            return authService.login('login', 'password')
                .then((payload) => {
                    let expectedConfig = {
                        method: 'post',
                        route: '/uaa/oauth/token',
                        headers: {
                            'Authorization': 'Basic',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: 'username=login&password=password'
                    };
                    expect(authService.send.calledOnce).to.equal(true);
                    expect(authService.send.args[0][0]).to.eql(expectedConfig);
                    expect(payload).to.equal('payload');
                });
        });
    });
});

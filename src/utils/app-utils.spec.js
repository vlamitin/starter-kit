import { describe, it, beforeEach, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import axios from "axios";
import { loadSettings } from "./app-utils";

describe('app-utils.js', () => {
    let serviceStub;

    beforeEach(() => {
        serviceStub = sinon.stub(axios, 'get');
        serviceStub.returns(Promise.resolve({ data: 'hello', status: 200 }));
    });

    afterEach(() => {
        serviceStub.reset();
        axios.get.restore();
    });

    describe('loadSettings', () => {
        describe('if response.status is ok', () => {
            it('loads ./settings.json and returns response.data', () => {
                return loadSettings()
                    .then((payload) => {
                        expect(payload).to.equal('hello');
                    });
            });
        });

        describe('if response.status is not ok', () => {
            it('consoles error and returns error obj', () => {
                serviceStub.reset();
                axios.get.restore();
                serviceStub = sinon.stub(axios, 'get')
                    .returns(Promise.resolve({ data: 'hello', status: 500 }));

                return loadSettings()
                    .catch((error) => {
                        expect(error.message).to.equal('loading settings failed, status: 500');
                    });
            });
        });
    });
});

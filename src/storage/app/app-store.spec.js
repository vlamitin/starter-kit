import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";

import AppStore from "./app-store";

describe('AppStore', () => {
    let appStore;

    beforeEach(() => {
        appStore = new AppStore();
    });

    describe('initial props', () => {
        it('has initial props', () => {
            expect(appStore.errorMessage).to.equal('');
        });
    });
});

require('babel-register')();
const i18next = require('i18next');
const localStorage = require('localStorage');
const jsdom = require('jsdom');
const RU_BUNDLE = require('../../locale/ru/ru');

if (!global.isI18nextInited) {
    i18next.init({
        lng: 'ru',
        resources: {
            ru: RU_BUNDLE
        }
    }, (err) => {
        if (err) {
            console.error('i18next err:', err);
        }
    });
    global.isI18nextInited = true;
}

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
const win = doc.defaultView;
win.localStorage = localStorage;
win.FormData = class {
    append() {
        return null;
    }
};
win.Blob = class Blob {};
win.URL.createObjectURL = () => null;
win.URL.revokeObjectURL = () => null;

global.document = doc;
global.window = win;

propagateToGlobal(win);

global.navigator = {
    userAgent: 'node.js'
};

function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = window[key];
    }
}

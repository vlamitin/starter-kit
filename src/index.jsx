import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import { loadSettings } from "./utils/app-utils";
import { prepareLocale } from "./utils/import-utils";
import { serviceLocator } from './protocol/service-locator';

import stores, { LOCALE } from "./storage";
import Router from "./router";

loadSettings()
    .then((settings) => {
        console.group('Initialization');
        console.info('>>> settings loaded: ', settings);
        serviceLocator.saveSettings(settings);
        console.info('>>> services set');
        return prepareLocale(LOCALE);
    })
    .then(() => {
        console.info('>>> locale ready');
        return startApplication();
    });

function startApplication() {
    console.info('>>> application start');
    console.groupEnd('Initialisation');
    render(
        <Provider {...stores}>
            <Router />
        </Provider>
        , document.getElementById('root')
    );
}

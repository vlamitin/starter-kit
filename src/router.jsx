import React from "react";
import Router from "react-router/es/Router";
import Route from "react-router/es/Route";
import IndexRedirect from "react-router/es/IndexRedirect";
import { history } from "./storage";
import NotFoundPage from "./components/common/not-found-page/not-found-page";
import App from "./components/app";

import { routeHandlers } from "./utils/route-handlers";

import {
    ROOT_ROUTE,
    MAIN,
    CUSTOM_PAGE,
    INDEX_ROUTE
} from "./routes";

export default function () {
    return (
        <Router history={history}>
            <Route path={ROOT_ROUTE} component={App}>
                <IndexRedirect to={INDEX_ROUTE} />
                <Route path={MAIN}
                       getComponent={routeHandlers.main.importComponent}
                />
                <Route path={CUSTOM_PAGE}
                       getComponent={routeHandlers.customPage.importComponent}
                />
                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    );
}


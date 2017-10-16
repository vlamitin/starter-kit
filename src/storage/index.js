import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { browserHistory } from "react-router";

import AppStore from "./app/app-store";

const routing = new RouterStore();

export const history = syncHistoryWithStore(browserHistory, routing);

export const LOCALE = 'ru';
export const APP_STORE = 'app';
export const ROUTING = 'routing';

const stores = {
    routing,
    app: new AppStore()
};

export default stores;

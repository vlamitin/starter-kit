import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { APP_STORE } from "../storage";

import "../theme/styles.scss";

@inject(APP_STORE)
@observer
export default class App extends Component {

    static propTypes = {
        children: PropTypes.object,
        app: PropTypes.object.isRequired
    };

    blockKeyBoard = (event) => {
        let { showSpinner } = this.props.app;
        if (showSpinner) {
            event.preventDefault();
        }
    };

    render() {
        return (
            <div className="app"
                 onKeyDown={this.blockKeyBoard}
                 onError={e => console.error('app onError: %o', e)}>
                { this.props.children }
            </div>
        );
    }
}

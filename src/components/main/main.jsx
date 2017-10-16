import React, { Component } from "react";
import PropTypes from "prop-types";
import i18next from "i18next";
import { inject, observer } from "mobx-react";

import { CUSTOM_PAGE } from "../../routes";
import { ROUTING } from "../../storage";

@inject(ROUTING)
@observer
export default class Main extends Component {

    static propTypes = {
        routing: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="main">
                <h1 className="main__title">{i18next.t('common.mainTitle')}</h1>
                <p className="main__content">{i18next.t('common.mainContent')}</p>
                <button onClick={() => this.props.routing.push(CUSTOM_PAGE)}>
                    {i18next.t('common.buttonLabel')}
                </button>
            </div>
        );
    }
}

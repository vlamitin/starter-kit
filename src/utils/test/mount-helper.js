import React from "react";
import { mount } from "enzyme";
import PropTypes from "prop-types";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Provider } from "mobx-react";

export const mountWithContext = (node, stores) => {
    const muiTheme = getMuiTheme();
    return mount(<Provider {...stores}>{node}</Provider>, {
        childContextTypes: {
            muiTheme: PropTypes.object
        },
        context: { muiTheme }
    });
};
import React from 'react';
import _ from 'lodash';
import MUISwitch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import Colors from './Colors.js';

const Switch = withStyles({
    switchBase: {
        '&$checked': {
            color: Colors['color-success-600']
        },
        '&$checked + $track': {
            backgroundColor: Colors['color-success-300']
        }
    },
    checked: {},
    track: {}
})(MUISwitch);

const CustomSwitch = (props) => {
    const { checked = false, tooltip, onChange } = props;
    if (tooltip) {
        return <Tooltip title={_.capitalize(checked || false)}>
            <Switch checked={checked || false} onChange={onChange} />
        </Tooltip>;
    } else {
        return <Switch checked={checked || false} />;
    }
};

export default CustomSwitch;

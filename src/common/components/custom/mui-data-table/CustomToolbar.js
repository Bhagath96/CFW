
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';


const defaultToolbarStyles = {
    iconButton: {
    }
};

function CustomToolbar({ toolTip = 'icon', classes, handleClick, icon }) {
    return (
        <React.Fragment>
            <Tooltip title={toolTip}>
                <IconButton className={classes.iconButton} onClick={handleClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(CustomToolbar);


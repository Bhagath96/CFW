import React from 'react';
import MuiComponents from '../../material-ui/MuiComponents';
import { makeStyles, Icons } from '../..';
import style from '../../../../assets/css/extendedTablesStyle.js';
const { MoreVert } = Icons;
const { Menu, MenuItem, IconButton } = MuiComponents;
const useStyles = makeStyles(style);

const ITEM_HEIGHT = 48;

function ActionButtons(menuActions) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    let menus = menuActions.menuActions;
    //to get an array with id
    let ArrayToGetId = menus.map((item) => {
        if (item.rowData) {
            return item.rowData[0];
        }
    });
    let onlyId = 0;
    //removing undefined items
    onlyId = ArrayToGetId.filter((item) => {
        return item !== undefined;
    });
    let status = menus.map((item) => {
        if (item.rowData) {
            return [item.rowData[8], item.rowData[0]];
        }
    });
    status = status.filter((item) => {
        return item !== undefined;
    });
    const classes = useStyles();

    const getClickedItem = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton
                className={classes.actionButton}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(event) => getClickedItem(event)}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch'
                    }
                }}
            >
                {
                    menus?.map((key) => (

                        <MenuItem key={key.name} onClick={() => {
                            key.fn2 ? key.fn2(status) : key.fn(onlyId); setAnchorEl(null);
                        }}>

                            {key.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}

export default ActionButtons;

import React from 'react';
import PropTypes from 'prop-types';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import AppMenuItemComponent from './AppMenuItemComponent';
import { makeStyles, createStyles, Components } from '../common/components';
const { List, ListItemIcon, ListItemText, Collapse, Divider } = Components;
import Colors from '../common/components/custom/Colors.js';

// React runtime PropTypes
export const AppMenuItemPropTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    Icon: PropTypes.elementType,
    items: PropTypes.array
};

const useStyles = makeStyles(() =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(255, 255, 255, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff'
                }
            },
            padding: '5px 5px',
            minWidth: 'min-content',
            background: 'rgba(255, 255, 255, 0.00)',
            '& .MuiListItemIcon-root': {
                color: '#f4f4f4'
            },
            '&:hover': {
                background: 'rgba(255, 255, 255, 0.08)'
            },
            width: '100%'

        },
        menuItemIcon: {
            color: Colors['menu-item-icon-color']
        },
        childPading: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '2px 30px;',
            minWidth: 'min-content'
        }
    })
);

const AppMenuItem = props => {
    const { name, link, Icon, items = [] } = props;
    const classes = useStyles();
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open);
    }

    const MenuItemRoot = (
        <AppMenuItemComponent className={classes.menuItem} link={link} onClick={handleClick}>
            {/* Display an icon if any */}
            {!!Icon && (
                <ListItemIcon className={classes.menuItemIcon}>
                    {Icon}
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!Icon} />
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <div><IconExpandMore /></div>}
            {isExpandable && open && <div><IconExpandLess /></div>}
        </AppMenuItemComponent>
    );


    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List className={classes.childPading}>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};


export default AppMenuItem;


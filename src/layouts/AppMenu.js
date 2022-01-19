import React, { useEffect } from 'react';
import { getMenuItems } from '../routes';
import AppMenuItem from './AppMenuItem';
import { makeStyles, createStyles, Components } from '../common/components';
import { useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../modules/user/constants';
import _ from '../utils/LodashUtils';

const { List } = Components;
const useStyles = makeStyles(() => createStyles({
    appMenu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        paddingLeft: '2px'
    }
}));

const AppMenu = () => {
    let menuItems = getMenuItems();
    const initialValues = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    useEffect(() => { }, [initialValues]);
    const classes = useStyles();

    return (
        initialValues &&
        <List component="nav" className={classes.appMenu} disablePadding>
            {menuItems.map((item, index) => (
                <AppMenuItem {...item} key={index} />
            ))}
        </List>
    );
};


export default AppMenu;

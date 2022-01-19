import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AddUserGroup from '../containers/AddUserGroup';
// import AssignUsersView from './AssignUsersView';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import AssignUserGroupTableView from './AssignUsersTableView';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';


const { Box, Tabs, AppBar, CardComponent } = Components;
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};


const useStyles = makeStyles(() => ({
    colorPrimary: commonTheme.tabAppbarColorPrimary,
    indicator: {
        backgroundColor: 'white',
        height: 3
    }
}));

function UserGroupMainPageViews() {
    const classes = useStyles();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const dispatch = useDispatch();
    const { id } = useParams();
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();

    const tabChangeCheck = (tabNo) => {
        dispatch(setTabIndex(tabNo));
    };

    const userGroupTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.EDIT_USER_GROUP) || false) {
        userGroupTabArray.push({ name: 'details', label: 'details', component: <AddUserGroup /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.EDIT_USER_GROUP) || false) {
        userGroupTabArray.push({ name: 'assignUser', label: 'assign_user', component: <AssignUserGroupTableView /> });
    }

    const setTab = (type) => {
        let index = findTabIndex(userGroupTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.USER_GROUP}/${id}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'assignUser':
                history.push(`${PATH.USER_GROUP}/${id}/assignUser`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.USER_GROUP}/${id}/details`);
                tabChangeCheck(index);
                break;
        }
    };
    let { tabs, tabPanels } = getTabDetails(userGroupTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(userGroupTabArray, lastPath) > -1 ? lastPath : userGroupTabArray[0].name);
        return () => {
            //dispatch(resetFormChange());
        };
    }, []);

    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected}
                        aria-label="UserGroup Tabs"
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        {tabs}
                    </Tabs>
                </AppBar>

                {tabPanels}
            </div>
        </CardComponent>

    );
}

export default UserGroupMainPageViews;

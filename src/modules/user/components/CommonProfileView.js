import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import ProfileDetailView from './ProfileDetailView';
import ChangePassword from './ChangePassword';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';


const { Box, Typography, Tabs, AppBar, CardComponentForList } = Components;
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
                    <Typography>{children}</Typography>
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

function CommonProfileView() {
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const dispatch = useDispatch();

    const tabChangeCheck = (tabNo) => {
        dispatch(setTabIndex(tabNo));
    };

    const commonProfileViewTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_USER_IN_NAV) || false) {
        commonProfileViewTabArray.push({ name: 'details', label: 'details', component: <ProfileDetailView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_USER_IN_NAV) || false) {
        commonProfileViewTabArray.push({ name: 'changePassword', label: 'change_password', component: <ChangePassword /> });
    }
    const setTab = (type) => {
        let index = findTabIndex(commonProfileViewTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.PROFILE}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'changePassword':
                history.push(`${PATH.PROFILE}/change_password`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.PROFILE}/details`);
                tabChangeCheck(index);
                break;
        }
    };

    const classes = useStyles();
    let { tabs, tabPanels } = getTabDetails(commonProfileViewTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonProfileViewTabArray, lastPath) > -1 ? lastPath : commonProfileViewTabArray[0].name);
        return () => {
            //dispatch(resetFormChange());
        };
    }, []);

    return (
        <CardComponentForList>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected}
                        aria-label="Profile Tabs"
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        {tabs}
                    </Tabs>
                </AppBar>
                {tabPanels}
            </div>
        </CardComponentForList>

    );
}

export default CommonProfileView;

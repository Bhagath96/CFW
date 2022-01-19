import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import CreateComplaintConfig from './CreateComplaintConfig';
import ComplaintConfigAssociation from './ComplaintConfigAssociation';
import { useSelector } from 'react-redux';
import commonTheme from '../../../common/theme';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';

const { Box, Typography, Tabs, AppBar, CardComponent } = Components;

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
    colorPrimary: commonTheme.tabAppbarColorPrimary

}));
function CommonComplaintEdit() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const tabChangeCheck = (tabNo) => {
        dispatch(setTabIndex(tabNo));
    };
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();

    const commonComplaintConfigEditTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.EDIT_COMPLAINT_CONFIG) || false) {
        commonComplaintConfigEditTabArray.push({ name: 'details', label: 'details', component: <CreateComplaintConfig /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.EDIT_COMPLAINT_CONFIG) || false) {
        commonComplaintConfigEditTabArray.push({ name: 'association', label: 'association', component: <ComplaintConfigAssociation /> });
    }

    const setTab = (type) => {
        let index = findTabIndex(commonComplaintConfigEditTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.COMPLAINT_CONFIG}/${id}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'association':
                history.push(`${PATH.COMPLAINT_CONFIG}/${id}/association`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.COMPLAINT_CONFIG}/${id}/details`);
                tabChangeCheck(index);
                break;
        }
    };

    let { tabs, tabPanels } = getTabDetails(commonComplaintConfigEditTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonComplaintConfigEditTabArray, lastPath) > -1 ? lastPath : commonComplaintConfigEditTabArray[0].name);
        return () => {
            //dispatch(resetFormChange());
        };
    }, []);

    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected} aria-label="simple tabs example"
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

export default CommonComplaintEdit;

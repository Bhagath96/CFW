import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ListRegularRole from './ListRegularRole';
import OrganisationRoles from './OrganisationRoles';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import { useDispatch, useSelector } from 'react-redux';

import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';


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
function commonView() {
  const classes = useStyles();
  const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  const dispatch = useDispatch();
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  const tabChangeCheck = (tabNo) => {
    dispatch(setTabIndex(tabNo));
  };

  const commonViewTabArray = [];
  if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.ACCESS_ROLE_IN_NAV) || false) {
    commonViewTabArray.push({ name: 'regularRoles', label: 'regular_roles', component: <ListRegularRole /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.ACCESS_ROLE_IN_NAV) || false) {
    commonViewTabArray.push({ name: 'organizationRoles', label: 'organization_roles', component: <OrganisationRoles /> });
  }


  const setTab = (type) => {
    let index = findTabIndex(commonViewTabArray, type);
    switch (type) {
      case 'regularRoles': {
        history.push(`${PATH.REG_ROLE}`);
        tabChangeCheck(index);
        break;
      }
      case 'organizationRoles':
        history.push(`${PATH.ORG_ROLE}`);
        tabChangeCheck(index);
        break;
      default:
        history.push(`${PATH.REG_ROLE}`);
        tabChangeCheck(index);
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(commonViewTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(commonViewTabArray, lastPath) > -1 ? lastPath : commonViewTabArray[0].name);
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

export default commonView;

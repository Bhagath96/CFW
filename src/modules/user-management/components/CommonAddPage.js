import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import AddUserView from './AddUserView';
import AddContact from './AddContact';
import AddPassword from './AddPassword';
import UpdateAddress from './UpdateAddress';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../../common';
import { PATH } from '../../../routes';
import { STATE_REDUCER_KEY } from '../constants';
import { setTabIndexForUser } from '../actions';
import { useParams } from 'react-router-dom';
import commonTheme from '../../../common/theme';
import AssignOrganizationTableView from './AssignOrganizationTableView';
import AssignRoleTableView from './AssignRoleTableView';
import AssignUserGroupTableView from './AssignUserGroupTableView';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';


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
  // colorPrimary: {
  //   color: '#634646',
  //   backgroundColor: '#039123'

  // }
  colorPrimary: commonTheme.tabAppbarColorPrimary

}));
function CommonAddPage() {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const { commonTemplateForUser: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  const dispatch = useDispatch();
  const { id } = useParams();

  const tabChangeCheck = (tabNo) => {
    dispatch(setTabIndexForUser(tabNo));
  };
  const userTabArray = [];

  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'details', label: 'details', component: <AddUserView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'addContact', label: 'contact', component: <AddContact /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'addPassword', label: 'change_password', component: <AddPassword /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'updateAddress', label: 'update_address', component: <UpdateAddress /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'assignOrganizations', label: 'assign_organization', component: <AssignOrganizationTableView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'assignRolesView', label: 'assign_roles', component: <AssignRoleTableView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || false) {
    userTabArray.push({ name: 'assignUserGroupView', label: 'assign_user_group', component: <AssignUserGroupTableView /> });
  }

  const setTab = (type) => {
    let index = findTabIndex(userTabArray, type);
    switch (type) {
      case 'details': {
        history.push(`${PATH.USER}/${id}/details`);
        tabChangeCheck(index);
        break;
      }
      case 'addContact':
        history.push(`${PATH.USER}/${id}/addContact`);
        tabChangeCheck(index);
        break;
      case 'addPassword':
        history.push(`${PATH.USER}/${id}/addPassword`);
        tabChangeCheck(index);
        break;
      case 'updateAddress':
        history.push(`${PATH.USER}/${id}/updateAddress`);
        tabChangeCheck(index);
        break;
      case 'assignOrganizations':
        history.push(`${PATH.USER}/${id}/assignOrganizations`);
        tabChangeCheck(index);
        break;
      case 'assignRolesView':
        history.push(`${PATH.USER}/${id}/assignRolesView`);
        tabChangeCheck(index);
        break;
      case 'assignUserGroupView':
        history.push(`${PATH.USER}/${id}/assignUserGroupView`);
        tabChangeCheck(index);
        break;
      default:
        history.push(`${PATH.USER}/${id}/details`);
        tabChangeCheck(index);
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(userTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(userTabArray, lastPath) > -1 ? lastPath : userTabArray[0].name);
    return () => {
      //dispatch(resetFormChange());
    };
  }, []);

  return (
    <CardComponent>
      <div className={classes.root}>
        <AppBar position="static" className={classes.colorPrimary}>
          <Tabs value={selected}
            aria-label="User Tabs"
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

export default CommonAddPage;

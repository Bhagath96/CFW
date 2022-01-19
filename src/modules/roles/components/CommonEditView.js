import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import EditRolePermission from './EditRolePermission';
import EditRoleView from './EditRoleView';
import { useDispatch, useSelector } from 'react-redux';
import { setEditTabIndex } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { useParams } from 'react-router-dom';
import commonTheme from '../../../common/theme';
import RoleAssignToUserTableView from './RoleAssignToUserTableView';
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
  // colorPrimary: {
  //   color: '#634646',
  //   backgroundColor: '#039123'

  // }
  colorPrimary: commonTheme.tabAppbarColorPrimary

}));
function CommonEditView() {
  const classes = useStyles();
  const { id, roleType } = useParams();
  // const [selectedPath, setSelectedPath] = React.useState('');
  const dispatch = useDispatch();
  const { commonEditTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  const setRoleTypePath = () => {
    let selectedPath = '';
    if (+roleType === 0) {
      // is ORGANIZATION_ROLE
      selectedPath = PATH.ORG_ROLE;
    } else if (+roleType === 1) {
      // is REGULAR_ROLE
      selectedPath = PATH.REG_ROLE;
    }
    return selectedPath;
  };
  const tabChangeCheck = (tabNo) => {
    dispatch(setEditTabIndex(tabNo));

  };

  const roleTabArray = [];
  if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.EDIT_ROLE) || false) {
    roleTabArray.push({ name: 'roles', label: 'roles', component: <EditRoleView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.EDIT_ROLE) || false) {
    roleTabArray.push({ name: 'permissions', label: 'permissions', component: <EditRolePermission /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.EDIT_ROLE) || false) {
    roleTabArray.push({ name: 'assignees', label: 'assignees', component: <RoleAssignToUserTableView /> });
  }
  const setTab = (type) => {
    let index = findTabIndex(roleTabArray, type);
    switch (type) {
      case 'roles': {
        history.push(`${setRoleTypePath()}/${roleType}/${id}/roles`);
        tabChangeCheck(index);
        break;
      }
      case 'permissions':
        history.push(`${setRoleTypePath()}/${roleType}/${id}/permissions`);
        tabChangeCheck(index);
        break;
      case 'assignees':
        history.push(`${setRoleTypePath()}/${roleType}/${id}/assignees`);
        tabChangeCheck(index);
        break;

      default:
        history.push(`${setRoleTypePath()}/${roleType}/${id}/roles} `);
        tabChangeCheck(index);
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(roleTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(roleTabArray, lastPath) > -1 ? lastPath : roleTabArray[0].name);
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

export default CommonEditView;

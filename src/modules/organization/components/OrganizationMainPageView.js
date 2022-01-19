import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import AssignUsers from './AssignUsersView';
import commonTheme from '../../../common/theme';
import ApiProviderNewView from './ApiProviderView';
import AssignModule from './assignModule/AssignModuleMainPage.js';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { STATE_REDUCER_KEY } from '../constants';
import { setTabIndex } from '../actions';
import { AddOrganization } from '../containers';
import AssignOrganizationRoleTableView from './AssignOrganizationRoleTableView';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/constants';

// import { setDefaultOrganization } from '../../user/actions';
// import _ from 'lodash';
const { AppBar, Tabs, CardComponent } = Components;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 275
  },
  root2: {
    flexGrow: 10,
    backgroundColor: theme.palette.background.paper
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  colorPrimary: commonTheme.tabAppbarColorPrimary
}));


export const OrganizationMainPageView = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();

  const organizationEditViewTabArray = [];
  if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || false) {
    organizationEditViewTabArray.push({ name: 'basic', label: 'tab_details', component: <AddOrganization /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || false) {
    organizationEditViewTabArray.push({ name: 'assignUser', label: 'tab_assign_users', component: <AssignUsers /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || false) {
    organizationEditViewTabArray.push({ name: 'assignRole', label: 'assign_roles', component: <AssignOrganizationRoleTableView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || false) {
    organizationEditViewTabArray.push({ name: 'assignModule', label: 'tab_assign_module', component: <AssignModule /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || false) {
    organizationEditViewTabArray.push({ name: 'apiProvider', label: 'tab_api_provider', component: <ApiProviderNewView /> });
  }


  const setTab = (type) => {
    let index = findTabIndex(organizationEditViewTabArray, type);
    switch (type) {
      case 'basic': {
        history.push(`${PATH.ORGANIZATION}/${id}/basic`);
        dispatch(setTabIndex(index));
        break;
      }
      case 'assignUser':
        history.push(`${PATH.ORGANIZATION}/${id}/assignUser`);
        dispatch(setTabIndex(index));
        break;

      case 'assignRole':
        history.push(`${PATH.ORGANIZATION}/${id}/assignRole`);
        dispatch(setTabIndex(index));
        break;
      case 'assignModule':
        history.push(`${PATH.ORGANIZATION}/${id}/assignModule`);
        dispatch(setTabIndex(index));
        break;
      case 'apiProvider':
        history.push(`${PATH.ORGANIZATION}/${id}/apiProvider`);
        dispatch(setTabIndex(index));
        break;
      default:
        history.push(`${PATH.ORGANIZATION}/${id}/basic`);
        dispatch(setTabIndex(index));
        break;
    }
  };
  let { tabs, tabPanels } = getTabDetails(organizationEditViewTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(organizationEditViewTabArray, lastPath) > -1 ? lastPath : organizationEditViewTabArray[0].name);
    return () => {
      //dispatch(resetFormChange());
    };
  }, []);
  return (
    < CardComponent >
      <div className={classes.root2}>
        <AppBar position="static" className={classes.colorPrimary}>
          <Tabs value={selected}
            aria-label="Organization Tabs"
            variant="scrollable"
            scrollButtons="on"

          >
            {tabs}
          </Tabs>
        </AppBar>
        {tabPanels}
      </div>
    </CardComponent >
  );
};

export default OrganizationMainPageView;

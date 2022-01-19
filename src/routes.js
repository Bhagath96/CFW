import React from 'react';
import { store } from './redux/store';
import { Route } from 'react-router-dom';

import { SubMenuAccessPermissions } from './utils/PermissionUtils';
import { RESOURCE_MAPPING, ACTION_MAPPING } from './common/constants';
import { Icons, I18n } from '../src/common/components';

import CommonProfileView from './modules/user/components/CommonProfileView';
import DashboardView from './modules/dashboard/components/dashboardView';
import BasicConfigState from './modules/basic-config-state/components/ListState';
import BasicConfigStateCreation from './modules/basic-config-state/components/CreateState';
import BasicConfigDistrict from './modules/basic-config-district/components/ListDistrict';
import BasicConfigDistrictCreation from './modules/basic-config-district/components/CreateDistrict';
import BasicConfigLSGI from './modules/basic-config-lsgi/components/ListLSGI';
import BasicConfigLSGICreation from './modules/basic-config-lsgi/components/CreateLSGI';
import { OrganizationTypeList, CreateOrganizationType } from './modules/organization-types/components';
import BasicConfigBlockPanchayath from './modules/basic-config-block-panchayath/components/ListBlockPanchayath';
import BasicConfigBlockPanchayathCreation from './modules/basic-config-block-panchayath/components/CreateBlockPanchayath';
import { ListUserView, CommonAddPage, AddUserView } from './modules/user-management/components/';
import { AddUserGroup, ListUserGroup } from './modules/userGroup/containers';
import { UserGroupMainPageViews } from './modules/userGroup/components';
import { CreateRoleView, CommonView, CommonEditView } from './modules/roles/components';
import { listOrganisationView } from './modules/organization/components';
import { AddOrganization, OrganizationMainPage } from './modules/organization/containers';
import { ListEvents, CreateEvents } from './modules/event/components';
import { ListSubscriptionType, CreateSubscriptionType, AssignUserGroupView, ListHomePosts, CreateHomePost } from './modules/subscription-types/components';
import AssignRoleView from './modules/subscription-types/components/AssignRoleView';
import { Assessment, Subscriptions } from '@material-ui/icons';
import { ListNews } from './modules/news/components';
import CreateNews from './modules/news/components/CreateNews';
import { ListContent, CreateContent } from './modules/content/components';
import { ListComplaint } from './modules/complaint/components';
import { CommonComplaintConfigEdit, ComplaintConfigList, CreateComplaintConfig } from './modules/complaint-config/components';


const { DashboardTwoTone, SettingsApplicationsTwoTone, EmojiFlags, PinDropOutlined, NatureOutlined, BusinessTwoTone,
    PeopleOutlineOutlined, ViewAgendaOutlined, PeopleAltTwoTone, PersonOutlineTwoTone, GroupTwoTone, SupervisedUserCircleTwoTone,
    Event, TocTwoTone
} = Icons;


export const PATH = {
    DASHBOARD: '/admin/index',
    PROFILE: '/admin/index/profile',
    USER: '/admin/index/user',
    BASIC_CONFIG_STATE: '/admin/index/state',
    BASIC_CONFIG_DISTRICT: '/admin/index/district',
    BASIC_CONFIG_LSGI: '/admin/index/lsgi',
    BASIC_CONFIG_ORG_TYPE: '/admin/index/organizationType',
    COMPLAINT_CONFIG: '/admin/index/complaintConfig',
    BASIC_CONFIG_BLOCK_PANCHAYATH: '/admin/index/block-panchayath',
    USER_GROUP: '/admin/index/user-group',
    ROLE: '/admin/index/role',
    REG_ROLE: '/admin/index/regular-role',
    ORG_ROLE: '/admin/index/organization-role',
    ORGANIZATION: '/admin/index/organization',
    EVENT: '/admin/index/event',
    SUBSCRIPTION: '/admin/index/subscription-topics',
    NEWS: '/admin/index/news',
    CONTENT: '/admin/index/content',
    COMPLAINT: '/admin/index/complaints'
};

export const getMenuItems = () => {
    let userDetails = store.getState();
    let menu = [], basicConfig = {}, usersAndOrganizations = {};

    menu.push({
        name: I18n.t('dashboard'),
        Icon: <SettingsApplicationsTwoTone />,
        link: PATH.DASHBOARD
    });

    menu.push({
        name: I18n.t('complaints'),
        Icon: <Assessment />,
        link: PATH.COMPLAINT
    });
    basicConfig = {
        name: I18n.t('basic_config'),
        Icon: <DashboardTwoTone />,
        items: []
    };
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.BLOCK_PANCHAYATH, ACTION_MAPPING.BLOCK_PANCHAYATH.ACCESS_BLOCK_PANCHAYATH_IN_NAV)) {
        basicConfig.items.push(
            {
                name: I18n.t('block_panchayath'),
                Icon: <ViewAgendaOutlined />,
                link: PATH.BASIC_CONFIG_BLOCK_PANCHAYATH
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        basicConfig.items.push(
            {
                name: I18n.t('district'),
                Icon: <PinDropOutlined />,
                link: PATH.BASIC_CONFIG_DISTRICT
            }
        );
    }

    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        basicConfig.items.push(
            {
                name: I18n.t('lsgi'),
                Icon: <NatureOutlined />,
                link: PATH.BASIC_CONFIG_LSGI
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.ACCESS_ORGANIZATION_TYPE_IN_NAV)) {
        basicConfig.items.push(
            {
                name: I18n.t('organization_type'),
                Icon: <PeopleOutlineOutlined />,
                link: PATH.BASIC_CONFIG_ORG_TYPE
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.ACCESS_STATE_IN_NAV)) {
        basicConfig?.items?.push(
            {
                name: I18n.t('state'),
                Icon: <EmojiFlags />,
                link: PATH.BASIC_CONFIG_STATE
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.ACCESS_STATE_IN_NAV)) {
        basicConfig?.items?.push(
            {
                name: I18n.t('complaint_config'),
                Icon: <EmojiFlags />,
                link: PATH.COMPLAINT_CONFIG
            }
        );
    }

    usersAndOrganizations = {
        name: I18n.t('users_and_organizations'),
        Icon: <PeopleAltTwoTone />,
        items: []
    };
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_USER_IN_NAV)) {
        usersAndOrganizations.items.push(
            {
                name: I18n.t('users'),
                Icon: <PersonOutlineTwoTone />,
                link: PATH.USER
            }
        );

    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.ACCESS_USERGROUP_IN_NAV)) {
        usersAndOrganizations.items.push(
            {
                name: I18n.t('user_groups'),
                Icon: <GroupTwoTone />,
                link: PATH.USER_GROUP
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.ACCESS_ROLE_IN_NAV)) {
        usersAndOrganizations.items.push(
            {
                name: I18n.t('roles'),
                Icon: <SupervisedUserCircleTwoTone />,
                link: PATH.REG_ROLE
            }
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ACCESS_ORG_IN_NAV)) {
        usersAndOrganizations.items.push(
            {
                name: I18n.t('organizations'),
                Icon: <BusinessTwoTone />,
                link: PATH.ORGANIZATION
            }
        );
    }
    menu.push({
        name: I18n.t('events'),
        Icon: <Event />,
        link: PATH.EVENT
    });
    menu.push({
        name: I18n.t('content'),
        Icon: <TocTwoTone />,
        link: PATH.CONTENT
    });
    menu.push(
        {
            name: I18n.t('news'),
            Icon: <BusinessTwoTone />,
            link: PATH.NEWS
        }
    );
    menu.push({
        name: I18n.t('subscription_topics'),
        Icon: <Subscriptions />,
        link: PATH.SUBSCRIPTION
    });
    if (usersAndOrganizations.items.length) {
        menu.push(usersAndOrganizations);
    }

    if (basicConfig.items.length > 0) {
        basicConfig.items.sort((a, b) => (a.name > b.name) ? 1 : -1);
        menu.push(basicConfig);
    }
    return menu;
};

export const getExceptionalPaths = () => {
    let userDetails = store.getState();
    // Paths Without Restrictions
    let expPaths = [];
    expPaths.push(
        <Route path={PATH.DASHBOARD} exact component={DashboardView} />,
        <Route path={`${PATH.PROFILE}`} exact component={CommonProfileView} />,
        <Route path={`${PATH.PROFILE}/details`} exact component={CommonProfileView} />,
        <Route path={`${PATH.PROFILE}/change_password`} exact component={CommonProfileView} />
    );
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.ACCESS_STATE_IN_NAV)) {
        expPaths.push(
            <Route path={PATH.BASIC_CONFIG_STATE} exact component={BasicConfigState} />,
            <Route path={`${PATH.BASIC_CONFIG_STATE}/create`} exact component={BasicConfigStateCreation} />,
            <Route path={`${PATH.BASIC_CONFIG_STATE}/:id`} exact component={BasicConfigStateCreation} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        expPaths.push(
            <Route path={PATH.BASIC_CONFIG_DISTRICT} exact component={BasicConfigDistrict} />,
            <Route path={`${PATH.BASIC_CONFIG_DISTRICT}/create`} exact component={BasicConfigDistrictCreation} />,
            <Route path={`${PATH.BASIC_CONFIG_DISTRICT}/:id`} exact component={BasicConfigDistrictCreation} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        expPaths.push(
            <Route path={PATH.BASIC_CONFIG_LSGI} exact component={BasicConfigLSGI} />,
            <Route path={`${PATH.BASIC_CONFIG_LSGI}/create`} exact component={BasicConfigLSGICreation} />,
            <Route path={`${PATH.BASIC_CONFIG_LSGI}/:id`} exact component={BasicConfigLSGICreation} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.ACCESS_ORGANIZATION_TYPE_IN_NAV)) {
        expPaths.push(
            <Route path={PATH.BASIC_CONFIG_ORG_TYPE} exact component={OrganizationTypeList} />,
            <Route path={`${PATH.BASIC_CONFIG_ORG_TYPE}/create`} exact component={CreateOrganizationType} />,
            <Route path={`${PATH.BASIC_CONFIG_ORG_TYPE}/:id`} exact component={CreateOrganizationType} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.BLOCK_PANCHAYATH, ACTION_MAPPING.BLOCK_PANCHAYATH.ACCESS_BLOCK_PANCHAYATH_IN_NAV)) {
        expPaths.push(
            <Route path={PATH.BASIC_CONFIG_BLOCK_PANCHAYATH} exact component={BasicConfigBlockPanchayath} />,
            <Route path={`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/create`} exact component={BasicConfigBlockPanchayathCreation} />,
            <Route path={`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/:id`} exact component={BasicConfigBlockPanchayathCreation} />
        );
    }
    expPaths.push(
        <Route path={PATH.COMPLAINT} exact component={ListComplaint} />
    );
    // if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.BLOCK_PANCHAYATH, ACTION_MAPPING.BLOCK_PANCHAYATH.ACCESS_BLOCK_PANCHAYATH_IN_NAV)) {
    expPaths.push(
        <Route path={PATH.EVENT} exact component={ListEvents} />,
        <Route path={`${PATH.EVENT}/create`} exact component={CreateEvents} />,
        <Route path={`${PATH.EVENT}/:id`} exact component={CreateEvents} />
    );
    // }
    expPaths.push(
        <Route path={PATH.CONTENT} exact component={ListContent} />,
        <Route path={`${PATH.CONTENT}/create`} exact component={CreateContent} />,
        <Route path={`${PATH.CONTENT}/:id`} exact component={CreateContent} />
    );

    expPaths.push(
        <Route path={PATH.SUBSCRIPTION} exact component={ListSubscriptionType} />,
        <Route path={`${PATH.SUBSCRIPTION}/create`} exact component={CreateSubscriptionType} />,
        <Route path={`${PATH.SUBSCRIPTION}/:id/associate-roles`} exact component={AssignRoleView} />,
        <Route path={`${PATH.SUBSCRIPTION}/:id/associate-user-groups`} exact component={AssignUserGroupView} />,
        <Route path={`${PATH.SUBSCRIPTION}/:id/posts`} exact component={ListHomePosts} />,
        <Route path={`${PATH.SUBSCRIPTION}/:id/posts/:postId`} exact component={CreateHomePost} />,
        <Route path={`${PATH.SUBSCRIPTION}/:id/posts/create`} exact component={CreateHomePost} />,

        <Route path={`${PATH.SUBSCRIPTION}/:id`} exact component={CreateSubscriptionType} />
    );

    expPaths.push(
        <Route path={PATH.NEWS} exact component={ListNews} />,
        <Route path={`${PATH.NEWS}/create`} exact component={CreateNews} />,
        <Route path={`${PATH.NEWS}/:id`} exact component={CreateNews} />
    );

    return expPaths;
};

export const getRoutePaths = () => {
    let userDetails = store.getState();
    let paths = [];


    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_USER_IN_NAV)) {
        paths.push(

            <Route path={PATH.USER} exact component={ListUserView} />,
            <Route path={`${PATH.USER}/create`} exact component={AddUserView} />,

            <Route path={`${PATH.USER}/:id/details`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/addContact`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/addPassword`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/updateAddress`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/assignOrganizations`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/assignRolesView`} exact component={CommonAddPage} />,
            <Route path={`${PATH.USER}/:id/assignUserGroupView`} exact component={CommonAddPage} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.ACCESS_USERGROUP_IN_NAV)) {
        paths.push(
            <Route path={PATH.USER_GROUP} exact component={ListUserGroup} />,
            <Route path={`${PATH.USER_GROUP}/create`} exact component={AddUserGroup} />,
            <Route path={`${PATH.USER_GROUP}/:id/details`} exact component={UserGroupMainPageViews} />,
            <Route path={`${PATH.USER_GROUP}/:id/assignUser`} exact component={UserGroupMainPageViews} />
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.ACCESS_ROLE_IN_NAV)) {
        paths.push(
            <Route path={PATH.REG_ROLE} exact component={CommonView} />,
            <Route path={PATH.ORG_ROLE} exact component={CommonView} />,
            <Route path={PATH.ROLE} exact component={CommonView} />,
            <Route path={`${PATH.REG_ROLE}/:roleType/create`} exact component={CreateRoleView} />,
            <Route path={`${PATH.ORG_ROLE}/:roleType/create`} exact component={CreateRoleView} />,

            <Route path={`${PATH.REG_ROLE}/:roleType/:id/roles`} exact component={CommonEditView} />,
            <Route path={`${PATH.REG_ROLE}/:roleType/:id/permissions`} exact component={CommonEditView} />,
            <Route path={`${PATH.REG_ROLE}/:roleType/:id/assignees`} exact component={CommonEditView} />,

            <Route path={`${PATH.ORG_ROLE}/:roleType/:id/roles`} exact component={CommonEditView} />,
            <Route path={`${PATH.ORG_ROLE}/:roleType/:id/permissions`} exact component={CommonEditView} />,
            <Route path={`${PATH.ORG_ROLE}/:roleType/:id/assignees`} exact component={CommonEditView} />
            //have to change the commonEditView page
        );
    }
    if (SubMenuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ACCESS_ORG_IN_NAV)) {
        paths.push(
            <Route path={PATH.ORGANIZATION} exact component={listOrganisationView} />,
            <Route path={`${PATH.ORGANIZATION}/create`} exact component={AddOrganization} />,
            <Route path={`${PATH.ORGANIZATION}/:id/basic`} exact component={OrganizationMainPage} />,
            <Route path={`${PATH.ORGANIZATION}/:id/assignRole`} exact component={OrganizationMainPage} />,
            <Route path={`${PATH.ORGANIZATION}/:id/assignUser`} exact component={OrganizationMainPage} />,
            <Route path={`${PATH.ORGANIZATION}/:id/assignModule`} exact component={OrganizationMainPage} />,
            <Route path={`${PATH.ORGANIZATION}/:id/apiProvider`} exact component={OrganizationMainPage} />
        );
    }
    paths.push(
        <Route path={PATH.COMPLAINT_CONFIG} exact component={ComplaintConfigList} />,
        <Route path={`${PATH.COMPLAINT_CONFIG}/create`} exact component={CreateComplaintConfig} />,
        <Route path={`${PATH.COMPLAINT_CONFIG}/:id`} exact component={CommonComplaintConfigEdit} />,
        <Route path={`${PATH.COMPLAINT_CONFIG}/:id/details`} exact component={CommonComplaintConfigEdit} />,
        <Route path={`${PATH.COMPLAINT_CONFIG}/:id/association`} exact component={CommonComplaintConfigEdit} />
    );

    return paths;
};

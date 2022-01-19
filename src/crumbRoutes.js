import { PATH } from './routes';

export const getBreadCrumbRoutes = () => ({
    [PATH.DASHBOARD]: {
        label: 'dashboard'
    },
    [PATH.USER]: {
        label: 'users'
    },
    [`${PATH.USER}/create`]: {
        label: 'create'
    },
    [`${PATH.USER}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.USER}/:id/addContact`]: {
        label: 'contact'
    },
    [PATH.NEWS]: {
        label: 'news'
    },
    [`${PATH.NEWS}/crete`]: {
        label: 'create'
    },
    [`${PATH.NEWS}/:id`]: {
        label: 'edit'
    },

    [`${PATH.USER}/:id/addPassword`]: {
        label: 'password'
    },
    [`${PATH.USER}/:id/updateAddress`]: {
        label: 'address'
    },
    [PATH.BASIC_CONFIG_STATE]: {
        label: 'state'
    },
    [`${PATH.BASIC_CONFIG_STATE}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_STATE}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_DISTRICT]: {
        label: 'district'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_LSGI]: {
        label: 'lsgi'
    },
    [`${PATH.BASIC_CONFIG_LSGI}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_LSGI}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_BLOCK_PANCHAYATH]: {
        label: 'block_panchayath'
    },
    [`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/:id`]: {
        label: 'edit'
    },
    [PATH.USER]: {
        label: 'users'
    },
    [`${PATH.USER}/create`]: {
        label: 'create'
    },
    [`${PATH.USER}/:id/details`]: {
        label: 'details'
    },
    // userDetail: {
    //     label: 'details'
    // },
    [`${PATH.USER}/:id/addContact`]: {
        label: 'contact'
    },
    [`${PATH.USER}/:id/addPassword`]: {
        label: 'password'
    },
    [`${PATH.USER}/:id/updateAddress`]: {
        label: 'address'
    },
    [`${PATH.USER}/:id/assignOrganizations`]: {
        label: 'assign_organization'
    },
    [`${PATH.USER}/:id/assignRolesView`]: {
        label: 'assign_roles'
    },
    [`${PATH.USER}/:id/assignUserGroupView`]: {
        label: 'assign_user_group'
    },
    [PATH.USER_GROUP]:
    {
        label: 'user_groups'
    },
    [`${PATH.USER_GROUP}/create`]: {
        label: 'create'
    },
    [`${PATH.USER_GROUP}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.USER_GROUP}/:id/assignUser`]: {
        label: 'assign_user'
    },
    [PATH.ROLE]: {
        label: 'roles'
    },
    [PATH.REG_ROLE]: {
        label: 'regular_roles'
    },
    [PATH.ORG_ROLE]: {
        label: 'organization_roles'
    },
    [`${PATH.REG_ROLE}/create`]: {
        label: 'regularrole',
        excluded: true
    },

    [`${PATH.ORG_ROLE}/create/`]: {
        label: 'organizationrole',
        excluded: true

    },
    //EDIT
    [`${PATH.REG_ROLE}/Regular/:id/roles`]: {
        label: 'roles'
        // excluded: true

    },
    [`${PATH.REG_ROLE}/:id/Regular/permissions`]: {
        label: 'permissions'
        // excluded: true

    },
    [`${PATH.REG_ROLE}/:id/Regular/assignees`]: {
        label: 'assignees'

    },
    [`${PATH.ORG_ROLE}/Regular/:id/roles`]: {
        label: 'roles'
    },
    [`${PATH.ORG_ROLE}/:id/Regular/permissions`]: {
        label: 'permissions'
    },
    [`${PATH.ORG_ROLE}/:id/Regular/assignees`]: {
        label: 'assignees'
    },
    [`${PATH.ORGANIZATION}`]: {
        label: 'organization'
    },
    [`${PATH.ORGANIZATION}`]: {
        label: 'organization'
    },
    [`${PATH.ORGANIZATION}/:id/basic`]: {
        label: 'details'
    },
    [`${PATH.ORGANIZATION}/:id/assignRole`]: {
        label: 'assign_role'
    },
    [`${PATH.ORGANIZATION}/:id/assignModule`]: {
        label: 'tab_assign_module'
    },
    [`${PATH.ORGANIZATION}/:id/apiProvider`]: {
        label: 'tab_api_provider'
    },


    [PATH.EVENT]: {
        label: 'events'
    },
    [`${PATH.EVENT}/create`]: {
        label: 'create'
    },
    [`${PATH.EVENT}/:id`]: {
        label: 'edit'
    },

    [`${PATH.SUBSCRIPTION}`]: {
        label: 'subscription_topics'
    },
    [`${PATH.SUBSCRIPTION}/associate-roles`]: {
        label: 'assign_role'
    },
    [`${PATH.SUBSCRIPTION}/create`]: {
        label: 'create'
    },
    [`${PATH.SUBSCRIPTION}/:id/posts`]: {
        label: 'posts'
    },
    [`${PATH.SUBSCRIPTION}/:id/posts/create`]: {
        label: 'create'
    },
    [`${PATH.SUBSCRIPTION}/:id/posts/edit`]: {
        label: 'edit'
    },
    [PATH.CONTENT]: {
        label: 'content'
    },
    [`${PATH.CONTENT}/create`]: {
        label: 'create'
    },
    [`${PATH.CONTENT}/:id`]: {
        label: 'edit'
    },
    [`${PATH.COMPLAINT}`]: {
        label: 'complaints'
    },
    [`${PATH.COMPLAINT_CONFIG}`]: {
        label: 'complaint_config'
    },
    [`${PATH.COMPLAINT_CONFIG}/:id/association`]: {
        label: 'association'
    },
    [PATH.BASIC_CONFIG_ORG_TYPE]: {
        label: 'organization_type'
    },
    [`${PATH.BASIC_CONFIG_ORG_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_ORG_TYPE}/:id`]: {
        label: 'edit'
    }
});

export const URL = {
    USER: {
        AUTHENTICATE: 'auth/realms/cfw/protocol/openid-connect/token',
        FETCH_USER_INFO: 'user/profile',
        CHANGE_PASSWORD: 'user/profile/password',
        SENT_USER_INFO: 'user/users/:userId',
        LOGOUT: 'logout'
    },
    COMMON: {
        LOAD_STATES: 'admin/states',
        LOAD_DISTRICTS: 'admin/districts',
        LOAD_BLOCK_PANCHAYATHS: 'admin/block-panchayaths',
        LOAD_DISTRICT_PANCHAYATHS: 'admin/district-panchayaths',
        LOAD_LSGI: 'admin/lsgis',
        LOAD_LSGI_TYPES: 'admin/organization-types/lsgi',
        LOAD_LANGUAGES: 'admin/languages',
        LIST_STATE: 'admin/states'
    },
    FORGOT_PASSWORD: {
        SENT_MOBILE_NUMBER_FOR_OTP: 'user/otp',
        OPT_VERIFY: 'user/otp/verify',
        RESET_PASSWORD: 'user/reset-password'
    },
    USER_MANAGEMENT: {
        ADD_USER: 'user/users',
        ADD_PASSWORD: 'addPassword',
        GET_COUNTRY_CODE: 'admin/countries',
        GET_USER_BY_ID: 'user/users/:userId',
        EDIT_USER_BASIC_DETAILS: 'user/users/:userId',
        UPDATE_USER: 'updateUser',
        UPDATE_USER_ORGANISATION: 'updateUserOrganisation',
        UPDATE_USER_PASSWORD: 'user/users/:userId/password',
        SEARCH_USER: 'user?',
        DELETE_USER: 'user/users/:id',
        LIST_USER: 'user/users',
        GET_USER: 'user/users/:userId/addresses',
        UPDATE_USER_ADDRESS: 'user/users/:userId/addresses',
        LOAD_ORGANISATION_FOR_USERS: 'user/users/:userId/organizations',
        EDIT_ORGANISATION_FOR_USERS: 'user/users/:userId/organizations/:defaultOrganizationId',
        LOAD_ROLE_FOR_USERS: 'user/users/:userId/roles',
        EDIT_ROLE_FOR_USERS: 'user/users/:userId/roles',
        LIST_USER_GROUP_FOR_USERS: 'user/users/:userId/user-groups',
        UPDATE_USER_GROUP_FOR_USERS: 'user/users/:userId/user-groups',
        GET_USER_CONTACT_DETAILS: 'user/users/:userId/contact',
        EDIT_USER_CONTACT_DETAILS: 'user/users/:userId/contact',
        GET_USER_TYPE: 'admin/user-types',
        LIST_ALL_USER_NAME: 'user/users',
        FETCH_ASSIGN_ORGANIZATION: 'user/users/:userId/organizations',
        UPDATE_ASSIGN_ORGANIZATION: 'user/users/:userId/organizations/:defaultOrgId',
        FETCH_ASSIGN_ROLES: 'user/users/:userId/roles',
        UPDATE_ASSIGN_ROLES: 'user/users/:userId/roles',
        FETCH_ASSIGN_USER_GROUP: 'user/users/:userId/user-groups',
        LIST_GENDER: 'admin/gender'
    },
    USER_GROUP: {
        SAVE_USER_GROUP: 'user/user-groups',
        UPDATE_USER_GROUP: 'user/user-groups',
        DELETE_USER_GROUP: 'user/user-groups/:id',
        LIST_USER_GROUP: 'user/user-groups',
        GET_USER_GROUP_BY_ID: 'user/user-groups/:id',
        FETCH_USERS_BY_USER_GROUP: 'user/user-groups/:userGroupId/users',
        UPDATE_USERS_BY_USER_GROUP: 'user/user-groups/:userGroupId/users',
        LIST_ALL_NAMES: 'user/user-groups',
        FETCH_ASSIGN_USERS: 'user/user-groups/:userGroupId/users'
    },
    ROLE: {
        UPDATE_USER_IN_ROLE: 'user/roles/:roleId/users',
        FETCH_RESOURCE_ACTIONS: 'user/resource-permissions/resources/:resourceId/roles/:roleId',
        SAVE_RESOURCE_ACTIONS: 'user/resource-permissions',
        UPDATE_RESOURCE_ACTIONS: 'user/resource-permissions/:resourcePermissionId',
        LIST_REGULAR_ROLE: 'user/roles/role-types/:roleTypeId',
        LIST_ORGANISATION_ROLE: 'user/roles/role-types/:roleTypeId',
        DELETE_ORGANIZATIONAL_ROLE: 'user/roles/:roleId',
        DELETE_REGULAR_ROLE: 'user/roles/:roleId',
        ADD_ROLE: 'user/roles',
        GET_ROLE_BY_ID: 'user/roles/:roleId',
        UPDATE_ROLE: 'user/roles/:roleId',
        GET_CONTROLLER_PERMISSIONS: 'user/resources',
        GET_CONTROLLER_PERMISSIONS_BY_ID: 'user/resource-actions/resources/:resourceId',
        SEND_ACTION_IDS: 'user/resource-permissions',
        SEND_PERMISSIONS_FOR_EDIT: 'user/resource-permissions/:resourcePermissionId',
        GET_USERS_BASED_ON_ROLE_ID: 'user/roles/:roleId/users',
        LIST_ALL_NAME_FOR_ROLE: 'user/roles/role-types/1',
        LIST_ALL_NAME_FOR_ORG_ROLE: 'user/roles/role-types/2',
        FETCH_ASSIGN_ROLE_TO_USER: 'user/roles/:roleId/users'
    },
    ORGANIZATION: {
        LOAD_STATES: 'admin/states',
        LOAD_DISTRICTS: 'admin/districts',
        LOAD_BLOCK_PANCHAYATHS: 'admin/block-panchayaths',
        LOAD_DISTRICT_PANCHAYATHS: 'admin/district-panchayaths',
        LOAD_LSGI: 'admin/lsgis',
        LOAD_LSGI_TYPES: 'admin/organization-types/lsgi',

        PARENT_ORGANIZATIONS: 'admin/organizations',
        LIST_ORGANISATION: 'admin/organizations',
        SAVE_ORGANIZATION: 'admin/organizations',
        UPDATE_ORGANIZATION: 'admin/organizations',

        DELETE_ORGANISATION: 'admin/organizations/:id',
        FETCH_ORGANIZATION: 'admin/organizations/:organizationId',
        ORGANIZATIONS_TYPES: 'admin/organization-types',

        ORGANIZATIONS_ROLE_TYPES: 'user/roles/role-types/:roleTypeId',

        LOAD_PROVIDERS: 'admin/api-providers',
        LOAD_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers',
        SAVE_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers',
        UPDATE_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers/:apiKeyProviderId',
        GET_EMAIL_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        GET_SMS_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        GET_NOTIFICATION_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        UPDATE_API_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        POST_API_PROVIDER: 'admin/organizations/:organizationId/api-key-providers',

        FETCH_ASSIGN_ROLE: 'admin/organizations/:orgId/roles/:roleId/users',
        FETCH_USER_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/users',
        UPDATE_USER_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/users',
        UPDATE_UASSIGN_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/rrf-organizations'

    },
    ORG_MODULES: {
        LIST_MODULES: 'admin/organizations/:organizationId/modules',
        LIST_ROLES: 'user/​roles​/role-types​/:roleTypeId',
        LIST_ASSIGNED_MODULES: 'admin/organizations/:orgID/modules:roleId',
        SAVE_MODULES: 'admin/organizations/:orgId/modules',
        SAVE_ASSIGNED_MODULES: 'admin/organizations/:orgId/roles/:roleId/modules '
    },
    NEWS: {
        LIST_NEWS: 'admin/news',
        FETCH_NEWS_BY_ID: 'admin/news/:newsId',
        GET_ROLE: 'admin/subscription-topics/:topicId/roles',
        GET_USER_GROUP: 'admin/subscription-topics/:topicId/usergroups',
        GET_ALL_ROLE: 'user/roles/role-types/2',
        GET_ALL_USER_GROUP: 'user/user-groups',

        SAVE_NEWS: 'admin/news',
        UPDATE_NEWS: 'admin/news/:newsId',
        DELETE_NEWS: 'admin/news/:newsId'
    },
    BASIC_CONFIG: {
        LIST_STATE: 'admin/states',
        SAVE_STATE: 'admin/states',
        DELETE_STATE: 'admin/states/:stateId',
        UPDATE_STATE: 'admin/states/:stateId',
        FETCH_STATE_BY_ID: 'admin/states/:stateId',
        DETAILS_SURVEY: 'dfg/templates/answers',
        DELETE_SURVEY: 'dfg/templates/answers/:surveyId',
        LIST_FILTER: 'dfg/templates/answers',

        LIST_DISTRICT: 'admin/districts',
        SAVE_DISTRICT: 'admin/districts',
        DELETE_DISTRICT: 'admin/districts/:districtId',
        UPDATE_DISTRICT: 'admin/districts/:districtId',
        FETCH_DISTRICT_BY_ID: 'admin/districts/:districtId',

        LIST_ITEM: 'admin/items',
        SAVE_ITEM: 'admin/items',
        UPDATE_ITEM: 'admin/items/:itemId',
        DELETE_ITEM: 'admin/items/:itemId',
        FETCH_ITEM_BY_ID: 'admin/items/:itemId',

        LIST_LSGI: 'admin/lsgis',
        SAVE_LSGI: 'admin/lsgis',
        DELETE_LSGI: 'admin/lsgis/:lsgisId',
        UPDATE_LSGI: 'admin/lsgis/:lsgisId',
        FETCH_LSGI_BY_ID: 'admin/lsgis/:lsgisId',

        LIST_DISTRICT_PANCHAYATH: 'admin/district-panchayaths',
        SAVE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths',
        DELETE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths/:districtPanchayathId',
        UPDATE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths/:districtPanchayathId',
        FETCH_DISTRICT_PANCHAYATH_BY_ID: 'admin/district-panchayaths/:districtPanchayathId',

        LIST_BLOCK_PANCHAYATH: 'admin/block-panchayaths',
        SAVE_BLOCK_PANCHAYATH: 'admin/block-panchayaths',
        DELETE_BLOCK_PANCHAYATH: 'admin/block-panchayaths/:blockPanchayathId',
        UPDATE_BLOCK_PANCHAYATH: 'admin/block-panchayaths/:blockPanchayathId',
        FETCH_BLOCK_PANCHAYATH_BY_ID: 'admin/block-panchayaths/:blockPanchayathId'
    },
    ORGANIZATION_TYPE: {
        LIST_ORGANIZATION_TYPE: 'admin/organization-types',
        EDIT_ORGANIZATION_TYPE: 'admin/organization-types/:organizationTypeId',
        GET_ORGANIZATION_TYPE_BY_ID: 'admin/organization-types/:organizationTypeId'
    },
    COMPLAINT_CONFIG: {
        COMPLAINT_CONFIG: 'admin/complaint-configs',
        COMPLAINT_CONFIG_BYID: 'admin/complaint-configs/:complaintConfigId',
        COMPLAINT_CONFIG_SERVICE_CONFIG: 'admin/complaint-configs/:complaintConfigId/roles'
    },
    CONTENT: {
        LIST_CONTENT: 'admin/content-details',
        SAVE_CONTENT: 'admin/content-details',
        DELETE_CONTENT: 'admin/content-details/:contentId',
        GET_CONTENT_BY_ID: 'admin/content-details/:contentId',
        UPDATE_CONTENT_BY_ID: 'admin/content-details/:contentId',
        LIST_DEFAULT_USER_GROUPS: 'admin/subscription-topics/3/usergroups',
        LIST_DEFAULT_ROLES: 'admin/subscription-topics/3/roles'

    },
    EVENT: {
        LIST_EVENT: 'admin/events',
        SAVE_EVENT: 'admin/events',
        DELETE_EVENT: 'admin/events/:eventId',
        GET_EVENT_BY_ID: 'admin/events/:eventId',
        UPDATE_EVENT_BY_ID: 'admin/events/:eventId',
        LIST_ROLES: 'user/roles',
        LIST_DEFAULT_ROLES: 'admin/subscription-topics/2/roles',
        LIST_USER_GROUPS: 'user/user-groups',
        LIST_DEFAULT_USER_GROUPS: 'admin/subscription-topics/2/usergroups',
        LIST_EVENT_TYPE: 'admin/event-types',
        LIST_ONLINE_PLATFORMS: 'admin/online-platforms'
    },
    SUBSCRIPTION_TYPE: {
        LIST_SUBSCRIPTION_TYPE: 'admin/subscription-topics',
        SAVE_SUBSCRIPTION_TYPE: 'admin/subscription-topics',
        DELETE_SUBSCRIPTION_TYPE: 'admin/subscription-topics/:id',
        UPDATE_SUBSCRIPTION_TYPE: 'admin/subscription-topics/:id',
        FETCH_SUBSCRIPTION_TYPE_BY_ID: 'admin/subscription-topics/:id',

        ASSIGN_ROLE_TO_TOPIC: 'admin/subscription-topics/:id/roles',
        ASSIGN_USER_GROUP_TO_TOPIC: 'admin/subscription-topics/:id/usergroups',
        LIST_HOME_POSTS: 'admin/subscription-topics/:id/posts',

        FETCH_HOME_POST_BY_ID: 'admin/subscription-topics/:id/posts/:postId',
        SAVE_HOME_POST: 'admin/subscription-topics/:id/posts',
        UPDATE_HOME_POST: 'admin/subscription-topics/:id/posts/:postId',
        DELETE_HOME_POST: 'admin/subscription-topics/:id/posts/:postId'

    },
    COMPLAINT: {
        LIST_COMPLAINT: 'admin/complaints'
    },
    DASHBOARD: {
        CHILD_COUNT: 'admin/dashboard/child-count',
        PARENT_COUNT: 'admin/dashboard/parent-count',
        TEACHERS_COUNT: 'admin/dashboard/teacher-count',
        GENERAL_PUBLIC: 'admin/dashboard/general-public-count',
        OFFICIAL_COUNT: 'admin/dashboard/officials-count',
        COMPLAINT_COUNT: 'admin/dashboard/complaints-count'
    }
};

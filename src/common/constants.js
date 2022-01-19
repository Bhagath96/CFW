import React from 'react';

export const RESOURCE_MAPPING = {
    USER: 'in.trois.common.model.entity.User',
    ORGANIZATION: 'in.trois.common.model.entity.Organization',
    USER_GROUP: 'in.trois.common.model.entity.UserGroup',
    DISTRICT: 'in.trois.common.model.entity.BasicConfig.District',
    STATE: 'in.trois.common.model.entity.BasicConfig.State',
    LSGI: 'in.trois.common.model.entity.BasicConfig.LSGI',
    ORGANIZATION_TYPE: 'in.trois.common.model.entity.BasicConfig.OrganizationType',
    COMPLAINT_CONFIG: 'in.trois.common.model.entity.BasicConfig.ComplaintConfig',
    BLOCK_PANCHAYATH: 'in.trois.common.model.entity.BasicConfig.BlockPanchayath',
    ROLE: 'in.trois.common.model.entity.Role'

};

export const ACTION_MAPPING = {
    USER: {
        ACCESS_USER_IN_NAV: 'ACCESS_USER_IN_NAV',
        EDIT_USER: 'EDIT_USER',
        DELETE_USER: 'DELETE_USER',
        LIST_USERS: 'LIST_USERS',
        ADD_USER: 'ADD_USER'
    },
    USER_GROUP: {
        ACCESS_USERGROUP_IN_NAV: 'ACCESS_USERGROUP_IN_NAV',
        LIST_USER_GROUP: 'LIST_USERGROUP',
        DELETE_USER_GROUP: 'DELETE_USERGROUP',
        ADD_USER_GROUP: 'ADD_USERGROUP',
        EDIT_USER_GROUP: 'EDIT_USERGROUP'
    },
    USER_ROLE: {
        ACCESS_ROLE_IN_NAV: 'ACCESS_ROLE_IN_NAV',
        LIST_ROLE: 'LIST_ROLE',
        DELETE_ROLE: 'DELETE_ROLE',
        ADD_ROLE: 'ADD_ROLE',
        EDIT_ROLE: 'EDIT_ROLE',
        EDIT_ORG_ROLE: 'EDIT_ORG_ROLE',
        DELETE_ORG_ROLE: 'DELETE_ORG_ROLE'
    },
    ORGANIZATION: {
        ACCESS_ORG_IN_NAV: 'ACCESS_ORG_IN_NAV',
        LIST_ORGANIZATIONS: 'LIST_ORGANIZATIONS',
        DELETE_ORGANIZATION: 'DELETE_ORGANIZATION',
        ADD_ORGANIZATION: 'ADD_ORGANIZATION',
        EDIT_ORGANIZATION: 'EDIT_ORGANIZATION'
    },
    DISTRICT: {
        ACCESS_DISTRICT_IN_NAV: 'ACCESS_DISTRICT_IN_NAV',
        LIST_DISTRICT: 'LIST_DISTRICT',
        DELETE_DISTRICT: 'DELETE_DISTRICT',
        ADD_DISTRICT: 'ADD_DISTRICT',
        EDIT_DISTRICT: 'EDIT_DISTRICT'
    },
    STATE: {
        ACCESS_STATE_IN_NAV: 'ACCESS_STATE_IN_NAV',
        LIST_STATE: 'LIST_STATE',
        DELETE_STATE: 'DELETE_STATE',
        ADD_STATE: 'ADD_STATE',
        EDIT_STATE: 'EDIT_STATE'
    },
    LSGI: {
        ACCESS_LSGI_IN_NAV: 'ACCESS_LSGI_IN_NAV',
        LIST_LSGI: 'LIST_LSGI',
        DELETE_LSGI: 'DELETE_LSGI',
        ADD_LSGI: 'ADD_LSGI',
        EDIT_LSGI: 'EDIT_LSGI'
    },
    ORGANIZATION_TYPE: {
        ACCESS_ORGANIZATION_TYPE_IN_NAV: 'ACCESS_ORGANIZATION_TYPE_IN_NAV',
        LIST_ORGANIZATIONS_TYPE: 'LIST_ORGANIZATIONS_TYPE',
        DELETE_ORGANIZATION_TYPE: 'DELETE_ORGANIZATION_TYPE',
        ADD_ORGANIZATION_TYPE: 'ADD_ORGANIZATION_TYPE',
        EDIT_ORGANIZATION_TYPE: 'EDIT_ORGANIZATION_TYPE'
    },
    COMPLAINT_CONFIG: {
        ACCESS_COMPLAINT_IN_WEB_NAV: 'ACCESS_COMPLAINT_CONFIG_IN_WEB_NAV',
        LIST_COMPLAINT_CONFIG: 'LIST_COMPLAINT_CONFIG',
        ADD_COMPLAINT_CONFIG: 'ADD_COMPLAINT_CONFIG',
        EDIT_COMPLAINT_CONFIG: 'EDIT_COMPLAINT_CONFIG',
        DELETE_COMPLAINT_CONFIG: 'DELETE_COMPLAINT_CONFIG',
        ACCESS_INCIDENT_IN_WEB_NAV: 'ACCESS_INCIDENT_IN_WEB_NAV'
    },
    BLOCK_PANCHAYATH: {
        ACCESS_BLOCK_PANCHAYATH_IN_NAV: 'ACCESS_BLOCK_PANCHAYATH_IN_NAV',
        LIST_BLOCK_PANCHAYATH: 'LIST_BLOCK_PANCHAYATH',
        DELETE_BLOCK_PANCHAYATH: 'DELETE_BLOCK_PANCHAYATH',
        ADD_BLOCK_PANCHAYATH: 'ADD_BLOCK_PANCHAYATH',
        EDIT_BLOCK_PANCHAYATH: 'EDIT_BLOCK_PANCHAYATH'
    }
};

export const DEFAULT_TABLE_PROPS = { page: 0, count: 0, size: 10 };

export const ERROR_CODES = {
    JWT_EXPIRED: 4401
};

export const VALIDATION_RULES = {
    PHONE_REG_EXP: /^[6-9]\d{9}$/,
    DECIMAL_REG_EXP: /^\d*\.{1}\d*$/,
    DIGIT_REG_EXP: /[0-9]/,
    EMAIL_REG_EXP: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};

export const MUI_COMMON_OPTIONS = {
    searchPlaceholder: 'search',
    print: false,
    download: false,
    filterType: 'dropdown',
    responsive: 'vertical',
    serverSide: true,
    enableNestedDataAccess: '.',
    selectableRows: 'none',
    count: DEFAULT_TABLE_PROPS.count,
    page: DEFAULT_TABLE_PROPS.page,
    search: false,
    customActions: [],
    customToolbarSelect: () => (<></>),
    textLabels: {
        pagination: {
            next: 'next_page',
            previous: 'previous_page',
            rowsPerPage: 'rows_per_page',
            displayRows: 'of'
        },
        filter: {
            title: 'filter',
            reset: 'reset',
            all: 'all'
        },
        viewColumns: {
            title: 'view_columns',
            titleArea: ''
        },
        toolbar: {
            filterTable: 'filter_table',
            search: 'search',
            viewColumns: 'view_columns'
        },
        body: {
            toolTip: 'sort',
            noMatch: 'no_matching_records_found'
        }
    }
};

export const RESPONSE_TYPE = {
    DROP_DOWN: { type: 'dropdown' },
    TABLE: { type: 'Table' }
};

export const TABLE_STICKY_ACTIONS = {
    setCellProps: () => ({
        style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            right: '0',
            background: 'white',
            zIndex: '90 !important'
        }
    }),
    setCellHeaderProps: () => ({
        style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            right: 0,
            background: 'white',
            zIndex: '101 !important'
        }
    })
};

export const PROJECT_CONFIG_PROPS = {
    API: 'Api',
    DETAILS: 'Details',
    THEME: 'Theme',
    I18N: 'Language',
    COMPONENTS: 'Components'
};

export const ADMIN_ROLES = [
    'ROLE_SYS_ADMIN'
];

export const YOUTUBE_API_KEY = 'AIzaSyBMCD1_SAGYwAHCdAkeoCvx_VWJKCh-0_o';

export const IMAGE_COMPRESS_REPEAT_COUNT = 3;

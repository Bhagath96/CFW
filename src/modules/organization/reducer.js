import { types as ActionTypes } from './actions';
import { API_TYPES } from './constants';
import { getPayloadData, formatFilterSearchKeys, formatCheckBoxesFromAPI } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const formatAPIPrividersList = (data = []) => {
    let response = {};
    _.forEach(API_TYPES, function (value) {
        response[value] = _.filter(data, { type: value });
    });
    return response;
};

const initialState = {
    parentOrganizations: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    organizationTypes: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    organizationRoleTypes: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    apiProviders: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    state: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    district: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    blockPanchayath: {
        data: [],
        requestInProgress: false,
        error: {}
    }, districtPanchayath: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    lsgi: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    lsgiTypes: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    addNew: {
        isUpdate: false,
        organization: {},
        requestInProgress: false,
        error: {}
    },
    addOrUpdateOrganization: {
        isUpdate: false,
        requestInProgress: false
    },
    listOrganisation: {
        data: [],
        searchKeys: [],
        requestInProgress: false,
        error: {}
    },
    deleteOrganization: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    assignUsers: {
        users: {},
        state: null,
        district: [],
        assignedUsers: false
    },
    assignUsersList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    updateAssignUsers: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    organizationAssignedUsers: {
        data: {},
        requestInProgress: false
    },
    loadUserGroupAssignUsers: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    emailApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    smsApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    notificationApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    paymentGatewayApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    updateApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    postApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    assignModuleList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    assignModulesView: {

    },
    roleAssignModulesView: {
        Roles: {}
    },
    roleList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    roleAssignModuleList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    saveRoleAssignModuleList: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    saveModuleList: {
        data: [],
        requestInProgress: false,
        error: {}
    }
};

let listOrganizationResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.CLEAR_ORGANIZATION_DETAILS:
            return Object.assign({}, state, {
                addNew: {
                }
            });
        case ActionTypes.SET_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                addNew: {
                    ...initialState.addNew,
                    requestInProgress: true
                },
                addOrUpdateOrganization: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    organization: getPayloadData(action.payload, {}),
                    requestInProgress: false
                },
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.SAVE_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_ORGANIZATION_FAILED:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.LIST_ORGANISATION_REQUEST:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...initialState.listOrganisation,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_ORGANISATION_SUCCESS:
            listOrganizationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    data: _.get(listOrganizationResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(listOrganizationResponse, 'searchKeys', [])),
                    pageSize: _.get(listOrganizationResponse, 'pageable.pageSize', 0),
                    pageNo: _.get(listOrganizationResponse, 'pageable.pageNumber', 0),
                    totalCount: _.get(listOrganizationResponse, 'totalElements', 0),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_ORGANISATION_FAILURE:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.DELETE_ORGANISATION_REQUEST:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...initialState.deleteOrganization,
                    requestInProgress: true
                }
            });
        case ActionTypes.DELETE_ORGANISATION_SUCCESS:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...state.deleteOrganization,
                    data: action.payload.data.data,
                    requestInProgress: false
                }
            });
        case ActionTypes.DELETE_ORGANISATION_FAILURE:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...state.deleteOrganization,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });


        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_REQUEST:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...initialState.parentOrganizations,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...state.parentOrganizations,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_FAILED:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...initialState.parentOrganizations,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.LOAD_ORGANIZATION_TYPES_REQUEST:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...initialState.organizationTypes,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_TYPES_SUCCESS:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...state.organizationTypes,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_TYPES_FAILED:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...initialState.organizationTypes,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.ORGANIZATION_COMMON_STATE_REQUEST:
            return Object.assign({}, state, {
                state: {
                    ...initialState.state,
                    requestInProgress: true
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_STATE_SUCCESS:
            return Object.assign({}, state, {
                state: {
                    ...state.state,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_STATE_FAILURE:
            return Object.assign({}, state, {
                state: {
                    ...initialState.state,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.LOAD_DISTRICTS_REQUEST:
            return Object.assign({}, state, {
                district: {
                    ...initialState.district,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_DISTRICTS_SUCCESS:
            return Object.assign({}, state, {
                district: {
                    ...state.district,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_DISTRICTS_FAILURE:
            return Object.assign({}, state, {
                district: {
                    ...initialState.district,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                districtPanchayath: {
                    ...initialState.districtPanchayath,
                    requestInProgress: true
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                districtPanchayath: {
                    ...state.districtPanchayath,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_FAILURE:
            return Object.assign({}, state, {
                districtPanchayath: {
                    ...initialState.districtPanchayath,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                blockPanchayath: {
                    ...initialState.blockPanchayath,
                    requestInProgress: true
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                blockPanchayath: {
                    ...state.blockPanchayath,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_FAILURE:
            return Object.assign({}, state, {
                blockPanchayath: {
                    ...initialState.blockPanchayath,
                    requestInProgress: false,
                    error: {
                        ...action?.payload?.error
                    }
                }
            });

        case ActionTypes.LOAD_LSGIS_REQUEST:
            return Object.assign({}, state, {
                lsgi: {
                    ...initialState.lsgi,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_LSGIS_SUCCESS:
            return Object.assign({}, state, {
                lsgi: {
                    ...state.lsgi,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_LSGIS_FAILURE:
            return Object.assign({}, state, {
                lsgi: {
                    ...state.lsgi,
                    error: {
                        ...action?.payload?.error
                    },
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_REQUEST:
            return Object.assign({}, state, {
                lsgiTypes: {
                    ...initialState.lsgiTypes,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_SUCCESS:
            return Object.assign({}, state, {
                lsgiTypes: {
                    ...state.lsgiTypes,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_FAILURE:
            return Object.assign({}, state, {
                lsgiTypes: {
                    ...state.lsgiTypes,
                    error: {
                        ...action?.payload?.error
                    },
                    requestInProgress: false
                }
            });
        case ActionTypes.UPDATE_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: true,
                    requestInProgress: false
                }
            });
        case ActionTypes.UPDATE_ORGANIZATION_FAILED:
            return Object.assign({}, state, {
                isUpdate: false,
                requestInProgress: false
            });
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_REQUEST:
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    ...initialState.organizationAssignedUsers,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS: {
            let assignUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    requestInProgress: false,
                    data: assignUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE:
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    ...state.organizationAssignedUsers,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_REQUEST:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...initialState.organizationRoleTypes,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...state.organizationRoleTypes,
                    data: _.get(getPayloadData(action.payload, {}), 'content', []),
                    dropdown: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.SET_ORGANIZATION_ROLE_TYPES:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...state.organizationRoleTypes,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_REQUEST:
            return Object.assign({}, state, {
                assignRole: {
                    ...initialState.assignRole,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS: {
            let assignUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignRole: {
                    requestInProgress: false,
                    data: assignUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE: {
            return Object.assign({}, state, {
                assignRole: {
                    ...state.assignRole
                }
            });
        }

        case ActionTypes.FETCH_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                assignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                assignModuleList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignModulesView: {
                    ...state.assignModulesView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                assignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.CLEAR_ASSIGNED_CHECKED_LIST:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    ...state.roleAssignModuleList,
                    data: []
                }
            });
        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_REQUEST:
            return Object.assign({}, state, {
                roleList: {
                    ...initialState.roleList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_SUCCESS:
            return Object.assign({}, state, {
                roleList: {
                    ...state.roleList,
                    data: _.get(action, 'payload.data.data', []),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_FAILURE:
            return Object.assign({}, state, {
                roleList: {
                    ...state.roleList,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                roleAssignModulesView: {
                    ...state.roleAssignModulesView,
                    moduleMapping: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SAVE_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_ASSIGNED_MODULES_REQUEST:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_ASSIGNED_MODULES_FAILURE:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: false
                }
            });

        case ActionTypes.LOAD_API_PROVIDERS_REQUEST:
            return Object.assign({}, state, {
                apiProviders: {
                    ...initialState.apiProviders,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_API_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                apiProviders: {
                    ...state.apiProviders,
                    data: formatAPIPrividersList(getPayloadData(action.payload, {})),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_API_PROVIDERS_FAILED:
            return Object.assign({}, state, {
                apiProviders: {
                    ...initialState.apiProviders,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: [],
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.UPDATE_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.UPDATE_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.UPDATE_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.POST_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.POST_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.POST_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        default:
            return state;
    }
};

export default reducer;

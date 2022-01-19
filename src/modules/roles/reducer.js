
import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { getPayloadData, formatCheckBoxesFromAPI, formatFilterSearchKeys } from '../../utils/ApiUtils';

const formatArray = (data = [], actionIds) => {
    data?.map((item) => {
        if ((item.bitwiseValue & actionIds) < 1) {
            item.isChecked = false;
        }
        if ((item.bitwiseValue & actionIds) > 0) {
            item.isChecked = true;
        }
    });
    return data;
};

const addingCheckBoxValues = (initialData, actionData) => {
    let sum = initialData += actionData;
    return sum;
};

const convertingResourceArray = (data = {}) => {
    const resourceActionArray = _.get(data.resource, 'resourceActions', []);
    const actionIds = _.get(data, 'actionIds', 0);
    resourceActionArray?.map((item) => {
        if ((item.bitwiseValue & actionIds) < 1) {
            item.isChecked = false;
        }
        if ((item.bitwiseValue & actionIds) > 0) {
            item.isChecked = true;
        }
    });
    return resourceActionArray;

};
const toGetActionIds = (data = {}) => {
    const actionIds = _.get(data, 'actionIds', 0);
    return actionIds;
};
const toGetResourcePermissionId = (data = {}) => {
    const resourcePermissionId = _.get(data, 'id', 0);
    return resourcePermissionId;
};
let array = [];
const pushTobitWiseValue = (bitWiseValue) => {
    array.push(bitWiseValue);
    return array;
};

const formatResourceActionsCheckBox = (actions) => {
    let response = {};
    let { actionIds, resource } = actions;
    _.forEach(_.get(resource, 'resourceActions', []), (action) => {
        response[action.bitwiseValue] = (action.bitwiseValue & actionIds) > 0;
    });
    return response;
};

const initialState = {
    addUser: {
        isUserAdd: false,
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listRegularRoles: {
        requestInProgress: false,
        regularRoles: [],
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    listOrganisationRoles: {
        requestInProgress: false,
        organisationRoles: [],
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    deleteOrganizationRole: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    deleteRegularRole: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    roleType: {
        data: [{ id: 1, name: 'Regular' }, { id: 2, name: 'Organizational' }]
    },
    addNew: {
        isUpdate: false,
        role: {},
        apiStatus: {
            save: {
                requestInProgress: false,
                requestStatus: '',
                error: {}
            }
        }
    },
    setRole: {
        data: {}
    },
    updateRole: {
        data: {},
        isUpdate: false,
        error: {},
        requestInProgress: false
    },
    setRoleType: {
        data: []
    },
    controllerPermissions: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    controllerPermissionsById: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    setCheckBoxValue: {
        data: 0
    },
    sendActionIds: {
        requestInProgress: false,
        error: {}

    },
    getrolePermissionsForEdit: {
        requestInProgress: false,
        data: {},
        actionIds: 0,
        resourcePermissionId: 0,
        error: {}
    },
    setResourceActionArray: {
        requestInProgress: false,
        data: [],
        error: {}
    },
    bitWiseValueArray: {
        bitWiseArray: []
    },
    sendPermissionForEdit: {
        requestInProgress: false,
        error: {}
    },
    // For Assignee
    assignUsers: {
        users: {}
    },
    assignUsersList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    updateAssignUserRoles: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    getroleById: {
        data: {},
        requestInProgress: false,
        errors: {}
    },
    // For PermissionTab
    resourceActions: {
        actions: {}
    },
    resourceActionsList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    updateRolePermission: {
        isUpdate: false,
        requestInProgress: false
    },
    RoleAssigniee: {
        isUpdate: false,
        requestInProgress: false
    },
    listKeyForOrgRole: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },

    commonTemplate: {
        selected: 0
    },
    commonEditTemplate: {
        selected: 0
    },
    assignRoleToUser: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }
};

let organizationRolesResponse = {}, regularRolesResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LIST_REGULAR_ROLE_REQUEST:
            return Object.assign({}, state, {
                listRegularRoles: {
                    ...initialState.listRegularRoles,
                    requestInProgress: true,
                    regularRoles: []
                }
            });
        case ActionTypes.LIST_REGULAR_ROLE_SUCCESS:
            regularRolesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRegularRoles: {
                    ...initialState.listRegularRoles,
                    regularRoles: _.get(regularRolesResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(regularRolesResponse, 'searchKeys', [])),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_REGULAR_ROLE_FAILURE:
            return Object.assign({}, state, {
                listRegularRoles: {
                    regularRoles: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        //to list organisation roles
        case ActionTypes.LIST_ORGANISATION_ROLE_REQUEST:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...initialState.listOrganisationRoles,
                    requestInProgress: true,
                    organisationRoles: []
                }
            });
        case ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS:
            organizationRolesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...initialState.listOrganisationRoles,
                    organisationRoles: _.get(organizationRolesResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(regularRolesResponse, 'searchKeys', [])),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_ORGANISATION_ROLE_FAILURE:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    organisationRoles: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        //to delete an ORGANIZATIONAL role
        case ActionTypes.DELETE_ORGANIZATIONAL_ROLE_REQUEST:
            return Object.assign({}, state, {
                deleteOrganizationRole: {
                    ...initialState.deleteOrganizationRole,
                    requestInProgress: true
                }
            });

        case ActionTypes.DELETE_ORGANIZATIONAL_ROLE_SUCCESS:
            return Object.assign({}, state, {
                deleteOrganizationRole: {
                    ...state.deleteOrganizationRole,
                    data: action.payload.data.data,
                    requestInProgress: false
                }
            });
        case ActionTypes.DELETE_ORGANIZATIONAL_ROLE_FAILURE:
            return Object.assign({}, state, {
                deleteOrganizationRole: {
                    ...state.deleteOrganizationRole,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        //to delete regular role
        case ActionTypes.DELETE_REGULAR_ROLE_REQUEST:
            return Object.assign({}, state, {
                deleteRegularRole: {
                    ...initialState.deleteRegularRole,
                    requestInProgress: true
                }
            });

        case ActionTypes.DELETE_REGULAR_ROLE_SUCCESS:
            return Object.assign({}, state, {
                deleteRegularRole: {
                    ...state.deleteRegularRole,
                    data: action.payload.data.data,
                    requestInProgress: false
                }
            });
        case ActionTypes.DELETE_REGULAR_ROLE_FAILURE:
            return Object.assign({}, state, {
                deleteRegularRole: {
                    ...state.deleteRegularRole,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        //to add a role
        case ActionTypes.ADD_ROLE_REQUEST:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    apiStatus: {
                        ...state.addNew.apiStatus,
                        save: {
                            ...initialState.addNew.apiStatus.save,
                            requestInProgress: true
                        }
                    }
                }
            });

        case ActionTypes.ADD_ROLE_SUCCESS:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    apiStatus: {
                        ...state.addNew.apiStatus,
                        save: {
                            ...initialState.addNew.apiStatus.save,
                            requestInProgress: false
                        }
                    }
                }
            });

        case ActionTypes.ADD_ROLE_FAILURE:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    apiStatus: {
                        ...state.addNew.apiStatus,
                        save: {
                            ...initialState.addNew.apiStatus.save,
                            requestInProgress: false,
                            error: {
                                ...action.payload.error
                            }
                        }
                    }
                }
            });
        //for getting a particular role
        case ActionTypes.SET_ROLE:
            return Object.assign({}, state, {
                setRole: {
                    data: action.payload.data
                }
            });
        case ActionTypes.SET_DATA:
            return Object.assign({}, state, {
                resourceActions: {
                    ...initialState.resourceActions,
                    ...state.resourceActions,
                    [action.payload.data.type]: action.payload.data.data
                }
            });
        //for updating role
        case ActionTypes.UPDATE_ROLE_REQUEST:
            return Object.assign({}, state, {
                updateRole: {
                    requestInProgress: true,
                    isUpdate: false
                }
            });
        case ActionTypes.UPDATE_ROLE_SUCCESS:
            return Object.assign({}, state, {
                updateRole: {
                    requestInProgress: false,
                    isUpdate: true,
                    error: {}
                }
            });
        case ActionTypes.UPDATE_ROLE_FAILURE:
            return Object.assign({}, state, {
                updateRole: {
                    requestInProgress: false,
                    isUpdate: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        //set role type
        case ActionTypes.SET_ROLE_TYPE:
            return Object.assign({}, state, {
                setRoleType: {
                    data: action.payload.data
                }
            });

        case ActionTypes.LIST_PERMISSION_CONTROLLER_REQUEST_BY_ROLE_ID:
            return Object.assign({}, state, {
                controllerPermissionsById: {
                    requestInProgress: true,
                    data: [],
                    error: {}
                }
            });
        case ActionTypes.LIST_PERMISSION_CONTROLLER_SUCCESS_BY_ROLE_ID:
            return Object.assign({}, state, {
                controllerPermissionsById: {
                    requestInProgress: false,
                    data: action.payload.data.data,
                    error: {}
                }
            });
        case ActionTypes.LIST_PERMISSION_CONTROLLER_FAILURE_BY_ROLE_ID:
            return Object.assign({}, state, {
                controllerPermissionsById: {
                    requestInProgress: false,
                    data: [],
                    error: 'An error has been occurred'
                }
            });
        case ActionTypes.SET_CHECKBOX_VALUE:
            return Object.assign({}, state, {
                setCheckBoxValue: {
                    requestInProgress: false,
                    data: addingCheckBoxValues(state.setCheckBoxValue.data, action.payload.data),
                    error: {}
                }
            });
        case ActionTypes.SEND_ACTION_IDS_REQUEST:

            return Object.assign({}, state, {
                sendActionIds: {

                    requestInProgress: true
                }
            });
        case ActionTypes.SEND_ACTION_IDS_SUCCESS:
            return Object.assign({}, state, {
                sendActionIds: {

                    requestInProgress: false
                }
            });
        case ActionTypes.SEND_ACTION_IDS_FAILURE:

            return Object.assign({}, state, {
                sendActionIds: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_REQUEST:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    requestInProgress: true,
                    data: {},
                    error: {}
                }
            });
        case ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_SUCCESS:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    requestInProgress: false,
                    data: convertingResourceArray(action.payload.data.data),
                    actionIds: toGetActionIds(action.payload.data.data),
                    resourcePermissionId: toGetResourcePermissionId(action.payload.data.data),

                    error: {}
                }
            });
        case ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_FAILURE:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    requestInProgress: false,
                    data: [],
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SET_RESOURCE_ACTION_ARRAY:
            return Object.assign({}, state, {
                setResourceActionArray: {
                    requestInProgress: true,
                    data: formatArray(action.payload.array, action.payload.actionIds),
                    error: {}
                }
            });

        case ActionTypes.CHANGE_CHECK_BOX_STATE:
            return Object.assign({}, state, {
                setResourceActionArray: {
                    data: action.payload.data,
                    error: {}
                }
            });
        case ActionTypes.TO_STORE_BITWISE_VALUE:
            return Object.assign({}, state, {
                bitWiseValueArray: {
                    bitWiseArray: pushTobitWiseValue(action.payload.data),
                    error: {}
                }
            });
        case ActionTypes.MINUS_ACTION_IDS:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    ...state.getrolePermissionsForEdit,
                    actionIds: state.getrolePermissionsForEdit.actionIds - action.payload.data,
                    error: {}
                }
            });
        case ActionTypes.SEND_PERMISSION_FOR_EDIT_REQUEST:
            return Object.assign({}, state, {
                sendPermissionForEdit: {
                    ...state.sendPermissionForEdit,
                    requestInProgress: true,
                    error: {}
                }
            });
        case ActionTypes.SEND_PERMISSION_FOR_EDIT_SUCCESS:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    ...state.getrolePermissionsForEdit,
                    requestInProgress: false,
                    error: {}
                }
            });
        case ActionTypes.SEND_PERMISSION_FOR_EDIT_FAILURE:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    ...state.getrolePermissionsForEdit,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.REMOVE_RESOURCE_ARRAY_ON_INITIAL_RENDER:
            return Object.assign({}, state, {
                getrolePermissionsForEdit: {
                    data: [],
                    actionIds: 0
                }
            });
        case ActionTypes.REMOVING_BIT_WISE_VALUE_ARRAY:
            return Object.assign({}, state, {
                bitWiseValueArray: {
                    bitWiseArray: [],
                    error: {}
                }
            });

        //Below codes are Added for Permission Tab
        case ActionTypes.LIST_PERMISSION_CONTROLLER_REQUEST:
            return Object.assign({}, state, {
                resourceActions: {
                    ...initialState.resourceActions
                },
                resourceActionsList: {
                    ...initialState.resourceActionsList
                },
                controllerPermissions: {
                    ...initialState.controllerPermissions,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_PERMISSION_CONTROLLER_SUCCESS:
            return Object.assign({}, state, {
                controllerPermissions: {
                    ...initialState.controllerPermissions,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_PERMISSION_CONTROLLER_FAILURE:
            return Object.assign({}, state, {
                controllerPermissions: {
                    ...initialState.controllerPermissions,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_USERS_BASED_ON_ROLE_ID_REQUEST:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...initialState.assignUsersList,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_USERS_BASED_ON_ROLE_ID_SUCCESS:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...state.assignUsersList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignUsers: {
                    ...state.assignUsers,
                    users: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_USERS_BASED_ON_ROLE_ID_FAILURE:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...state.assignUsersList,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SET_ROLE_REQUEST:
            return Object.assign({}, state, {
                getroleById: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SET_ROLE_SUCCESS:
            return Object.assign({}, state, {
                getroleById: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.SET_ROLE_FAILURE:
            return Object.assign({}, state, {
                getroleById: {
                    data: {},
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_RESOURCE_ACTIONS_REQUEST:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...initialState.resourceActionsList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RESOURCE_ACTIONS_SUCCESS:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...initialState.resourceActionsList,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                },
                resourceActions: {
                    ...initialState.resourceActions,
                    ...state.resourceActions,
                    actions: formatResourceActionsCheckBox(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_RESOURCE_ACTIONS_FAILURE:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...state.resourceActionsList,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.SAVE_RESOURCE_ACTIONS_REQUEST:
            return Object.assign({}, state, {
                updateRolePermission: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_RESOURCE_ACTIONS_SUCCESS:
            return Object.assign({}, state, {
                updateRolePermission: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_RESOURCE_ACTIONS_FAILURE:
            return Object.assign({}, state, {
                updateRolePermission: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.UPDATE_USERS_IN_ROLES_REQUEST:
            return Object.assign({}, state, {
                RoleAssigniee: {
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_USERS_IN_ROLES_SUCCESS:
            return Object.assign({}, state, {
                RoleAssigniee: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.UPDATE_USERS_IN_ROLES_FAILURE:
            return Object.assign({}, state, {
                RoleAssigniee: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.SET_USER_ROLE_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.SET_USER_ROLE_EDIT_TAB_INDEX:
            return Object.assign({}, state, {
                commonEditTemplate: {
                    selected: action.payload.data
                }
            });

        case ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_REQUEST:
            return Object.assign({}, state, {
                assignRoleToUser: {
                    ...initialState.assignRoleToUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_SUCCESS: {
            let assignUserGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignRoleToUser: {
                    requestInProgress: false,
                    data: assignUserGroupResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUserGroupResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_FAILURE: {
            return Object.assign({}, state, {
                assignRoleToUser: {
                    ...state.assignRoleToUser
                }
            });
        }
        default:
            return state;
    }
};
export default reducer;


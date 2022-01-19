import { types as ActionTypes } from './actions';
import utils from '../../utils';

const {
    lodashUtils: _,
    apiUtils: { formatCheckBoxesFromAPI, getPayloadData, formatFilterSearchKeys }
} = utils;

const initialState = {
    editData: {
        addUserGroup: {}
    },
    addUserGroup: {
        isUpdate: false,
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    editUserGroup: {
        isUpdate: false,
        data: {},
        requestInProgress: false
    },
    listUserGroup: {
        data: [],
        searchKeys: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    deleteUserGroup: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    assignUsers: {
        users: {}
    },
    assignUsersList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    updateAssignUserGroups: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listAllNames: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listDescription: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listFilterDatasForUserGroupFilter: {},
    commonTemplate: {
        selected: 0
    },
    assignUserForUserGroup: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }
};

let userGroupResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.STORE_JSON_DATA_FOR_USER_GROUP:
            return Object.assign({}, state, {
                listFilterDatasForUserGroupFilter: {
                    ...state.listFilterDatasForUserGroupFilter,
                    ...action.payload.data
                }
            });

        case ActionTypes.SAVE_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_USER_GROUP_SUCCESS:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_USER_GROUP_FAILED:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.UPDATE_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_USER_GROUP_SUCCESS:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: false
                }
            });
        case ActionTypes.UPDATE_USER_GROUP_FAILED:
            return Object.assign({}, state, {
                addUserGroup: {
                    ...state.addUserGroup,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LIST_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                listUserGroup: {
                    ...initialState.listUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_USER_GROUP_SUCCESS:
            userGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listUserGroup: {
                    ...state.listUserGroup,
                    requestInProgress: false,
                    data: _.get(userGroupResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(userGroupResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.LIST_USER_GROUP_FAILED:
            return Object.assign({}, state, {
                listUserGroup: {
                    ...state.listUserGroup,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.DELETE_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                deleteUserGroup: {
                    ...initialState.deleteUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.DELETE_USER_GROUP_SUCCESS:
            return Object.assign({}, state, {
                deleteUserGroup: {
                    ...state.deleteUserGroup,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.DELETE_USER_GROUP_FAILED:
            return Object.assign({}, state, {
                deleteUserGroup: {
                    ...state.deleteUserGroup,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_USER_GROUP_BY_ID_REQUEST:
            return Object.assign({}, state, {
                editData: {
                    ...initialState.editData,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_USER_GROUP_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                editData: {
                    ...state.editData,
                    addUserGroup: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_USER_GROUP_BY_ID_FAILED:
            return Object.assign({}, state, {
                editData: {
                    ...initialState.editData,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_USERS_BY_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...initialState.assignUsersList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_USERS_BY_USER_GROUP_SUCCESS:
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
        case ActionTypes.FETCH_USERS_BY_USER_GROUP_FAILURE:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...state.assignUsersList,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.UPDATE_USERS_IN_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                editUserGroup: {
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_USERS_IN_USER_GROUP_SUCCESS:
            return Object.assign({}, state, {
                editUserGroup: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.UPDATE_USERS_IN_USER_GROUP_FAILURE:
            return Object.assign({}, state, {
                editUserGroup: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.RESET_FORM:
            return Object.assign({}, state, {
                editData: {
                    ...initialState.editData
                }
            });
        case ActionTypes.SET_USER_GROUP_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });

        case ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                assignUserForUserGroup: {
                    ...initialState.assignUserGroupForUser,
                    requestInProgress: true
                }
            });
        case ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS: {
            let assignUserGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignUserForUserGroup: {
                    requestInProgress: false,
                    data: assignUserGroupResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUserGroupResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_FAILURE: {
            return Object.assign({}, state, {
                assignUserForUserGroup: {
                    ...state.assignUserForUserGroup
                }
            });
        }

        default:
            return state;
    }
};

export default reducer;

import { types as ActionTypes } from './actions';
import { getPayloadData } from '../../utils/ApiUtils';
import { formatPermission } from '../../utils/PermissionUtils';
import _ from '../../utils/LodashUtils';

const initialState = {
    login: {
        isAuthenticating: false
    },
    authData: {},
    info: {
        defaultOrganization: null
    },
    organization: {},
    organizationArray: {},
    organizationDefaultValue: {},
    userProfile: {
        data: [],
        requestInProgress: false
    },
    updateUserProfile: {
        requestInProgress: false,
        updateProfileStatus: false
    },
    changePassword: {
        requestInProgress: false,
        changePasswordStatus: false
    },
    language: {
        data: ''
    },
    userRoles: {},
    commonTemplate: {
        selected: 0
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGOUT_USER:
            return Object.assign({}, state, {
                ...initialState
            });
        case ActionTypes.AUTH_USER_REQUEST:
            return Object.assign({}, state, {
                ...initialState,
                login: {
                    isAuthenticating: true
                }
            });
        case ActionTypes.AUTH_USER_SUCCESS:
        case ActionTypes.REFRESH_TOKEN_API_SUCCESS:
            return Object.assign({}, state, {
                authData: { ...action.payload.data }
            });
        case ActionTypes.FETCH_USER_INFO_SUCCESS:
            {
                let profileData = getPayloadData(action.payload, {});
                return Object.assign({}, state, {
                    login: {
                        isAuthenticating: false
                    },
                    info: profileData,
                    userRoles: formatPermission(_.get(profileData, 'roles', [])),
                    organizationArray: _.get(profileData, 'organizations', []).map(organization => ({ id: organization.id, name: organization.name })),
                    organizationDefaultValue: _.get(profileData, 'defaultOrganization')
                });
            }
        case ActionTypes.AUTH_USER_FAILED:
        case ActionTypes.FETCH_USER_INFO_FAILED:
            return Object.assign({}, state, {
                ...initialState,
                login: {
                    isAuthenticating: false
                }
            });

        case ActionTypes.FETCH_USER_PROFILE_REQUEST:
            return Object.assign({}, state, {
                userProfile: {
                    ...initialState.userProfile,
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                userProfile: {
                    ...state.userProfile,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_USER_PROFILE_FAILURE:
            return Object.assign({}, state, {
                userProfile: {
                    ...state.userProfile,
                    requestInProgress: false
                }
            });

        case ActionTypes.SEND_USER_PROFILE_REQUEST:
            return Object.assign({}, state, {
                updateUserProfile: {
                    requestInProgress: true,
                    updateProfileStatus: false
                }
            });
        case ActionTypes.SEND_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                updateUserProfile: {
                    updateProfileStatus: true,
                    requestInProgress: false
                }
            });
        case ActionTypes.SEND_USER_PROFILE_FAILURE:
            return Object.assign({}, state, {
                updateUserProfile: {
                    requestInProgress: false,
                    updateProfileStatus: false
                }
            });

        case ActionTypes.CHANGE_USER_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                changePassword: {
                    requestInProgress: true,
                    changePasswordStatus: false
                }
            });
        case ActionTypes.CHANGE_USER_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                changePassword: {
                    changePasswordStatus: true,
                    requestInProgress: false
                }
            });
        case ActionTypes.CHANGE_USER_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                changePassword: {
                    requestInProgress: false,
                    changePasswordStatus: false
                }
            });

        case ActionTypes.LOAD_ORGANIZATIONS_REQUEST:
            return Object.assign({}, state, {
                organization: {
                    ...initialState.organization,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, {
                organization: {
                    ...state.organization,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_ORGANIZATIONS_FAILED:
            return Object.assign({}, state, {
                organization: {
                    ...initialState.organization,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SET_PROFILE_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.SET_DEFAULT_ORGANIZATION: {
            return Object.assign({}, state, {
                info: {
                    ...state.info,
                    defaultOrganization: {
                        ...action.payload.data
                    }
                }
            });
        }

        default:
            return state;
    }
};

export default reducer;

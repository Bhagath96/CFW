import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { getPayloadData } from '../../utils/ApiUtils';


const initialState = {
    listSubscriptionTypeDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchSubscriptionTypeById: {
        data: {},
        requestInProgress: false
    },
    listUserGroups: {
        data: [],
        dropdown: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    listHomePosts: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchHomePostById: {
        data: {
            labels: [{}]
        },
        requestInProgress: false
    },
    listOrganisationRoles: {
        data: [],
        dropdown: []
    }

};
let organizationRolesResponse = {}, userGroupResponse = {}, listHomePostResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listSubscriptionTypeDetails: {
                    ...initialState.listSubscriptionTypeDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                listSubscriptionTypeDetails: {
                    ...state.listSubscriptionTypeDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listSubscriptionTypeDetails: {
                    ...initialState.listSubscriptionTypeDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchSubscriptionTypeById: {
                    ...state.fetchSubscriptionTypeById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchSubscriptionTypeById: {
                    ...state.fetchSubscriptionTypeById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchSubscriptionTypeById: {
                    ...state.fetchSubscriptionTypeById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_SUBSCRIPTION_TYPE_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchSubscriptionTypeById: {}
            });
        case ActionTypes.LIST_ORGANISATION_ROLE_REQUEST:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...state.listOrganisationRoles,
                    requestInProgress: true,
                    organisationRoles: []
                }
            });
        case ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS:
            organizationRolesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...state.listOrganisationRoles,
                    organisationRoles: _.get(organizationRolesResponse, 'content', []),
                    dropdownAll: organizationRolesResponse,
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
        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_REQUEST:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...state.listOrganisationRoles,
                    requestInProgress: true,
                    organisationRoles: []
                }
            });
        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_SUCCESS:
            userGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...state.listOrganisationRoles,
                    organisationRoles: _.get(userGroupResponse, 'content', []),
                    dropdown: userGroupResponse,
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_FAILURE:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    organisationRoles: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_REQUEST:
            return Object.assign({}, state, {
                listUserGroups: {
                    ...state.listUserGroups,
                    requestInProgress: true,
                    organisationRoles: []
                }
            });
        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_SUCCESS:
            userGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listUserGroups: {
                    ...state.listUserGroups,
                    data: _.get(userGroupResponse, 'content', []),
                    dropdown: userGroupResponse,
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_FAILURE:
            return Object.assign({}, state, {
                listUserGroups: {
                    organisationRoles: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LIST_USER_GROUPS_REQUEST:
            return Object.assign({}, state, {
                listUserGroups: {
                    ...state.listUserGroups,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_USER_GROUPS_SUCCESS:
            userGroupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listUserGroups: {
                    ...state.listUserGroups,
                    data: _.get(userGroupResponse, 'content', []),
                    dropdownAll: userGroupResponse,
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_USER_GROUPS_FAILURE:
            return Object.assign({}, state, {
                listUserGroups: {
                    data: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LIST_HOME_POSTS_REQUEST:
            return Object.assign({}, state, {
                listHomePosts: {
                    ...initialState.listHomePosts,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_HOME_POSTS_SUCCESS:
            listHomePostResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listHomePosts: {
                    ...initialState.listHomePosts,
                    data: _.get(listHomePostResponse, 'content', []),
                    requestInProgress: false
                }
            });
        case ActionTypes.LIST_HOME_POSTS_FAILURE:
            return Object.assign({}, state, {
                listHomePosts: {
                    data: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_HOME_POST_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchHomePostById: {
                    ...state.fetchHomePostById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_HOME_POST_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchHomePostById: {
                    ...state.fetchHomePostById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_HOME_POST_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchHomePostById: {
                    ...state.fetchHomePostById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_HOME_POST_REDUCER:
            return Object.assign({}, state, {
                fetchHomePostById: {}
            });
        case ActionTypes.CLEAR_DEFAULT_DATA:
            return Object.assign({}, state, {
                listOrganisationRoles: {
                    ...initialState.listOrganisationRoles
                },
                listUserGroups: {
                    ...initialState.listUserGroups
                }
            });
        default:
            return state;

    }
};
export default reducer;

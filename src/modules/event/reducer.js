import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';
import { convertToLocal } from '../../utils/DateUtils';
const dateFormateChange = (data) => {
    let response = {};
    response = data;
    response.eventEnd = convertToLocal(data.eventEnd, 'YYYY-MM-DDTHH:mm:ss');
    response.eventStart = convertToLocal(data.eventStart, 'YYYY-MM-DDTHH:mm:ss');
    return response;
};

const initialState = {

    listEventDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchEventById: {
        data: {},
        requestInProgress: false
    },
    fetchRoles: {
        data: [],
        requestInProgress: false
    },
    fetchDefaultRoles: {
        data: [],
        requestInProgress: false
    },
    fetchUserGroups: {
        data: [],
        requestInProgress: false
    },
    fetchDefaultUserGroups: {
        data: [],
        requestInProgress: false
    },
    eventType: {
        data: [],
        requestInProgress: false
    },

    stateList: {
        data: [],
        requestInProgress: false
    },
    districtList: {
        data: [],
        requestInProgress: false
    },
    lsgiTypeList: {
        data: [],
        requestInProgress: false
    },
    lsgiList: {
        data: [],
        requestInProgress: false
    },
    onlinePlatformList: {
        data: [],
        requestInProgress: false
    }

};
let listEventResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_EVENT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listEventDetails: {
                    ...initialState.listEventDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_EVENT_DETAILS_SUCCESS:
            listEventResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listEventDetails: {
                    ...state.listEventDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listEventResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_EVENT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listEventDetails: {
                    ...initialState.listEventDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_EVENT_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchEventById: {
                    ...state.fetchEventById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_EVENT_DETAILS_BY_ID_SUCCESS:

            return Object.assign({}, state, {
                fetchEventById: {
                    ...state.fetchEventById,
                    requestInProgress: false,
                    data: dateFormateChange(getPayloadData(action.payload, {}))
                }
            });
        case ActionTypes.FETCH_EVENT_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchEventById: {
                    ...state.fetchEventById,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.FETCH_ROLES_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchRoles: {
                    ...state.fetchRoles,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_ROLES_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchRoles: {
                    ...state.fetchRoles,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_ROLES_DETAILS_FAILURE:
            return Object.assign({}, state, {
                fetchRoles: {
                    ...state.fetchRoles,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchDefaultRoles: {
                    ...state.fetchDefaultRoles,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchDefaultRoles: {
                    ...state.fetchDefaultRoles,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_FAILURE:
            return Object.assign({}, state, {
                fetchDefaultRoles: {
                    ...state.fetchDefaultRoles,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_USER_GROUPS_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchUserGroups: {
                    ...state.fetchUserGroups,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_USER_GROUPS_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchUserGroups: {
                    ...state.fetchUserGroups,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_USER_GROUPS_DETAILS_FAILURE:
            return Object.assign({}, state, {
                fetchUserGroups: {
                    ...state.fetchUserGroups,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchDefaultUserGroups: {
                    ...state.fetchDefaultUserGroups,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchDefaultUserGroups: {
                    ...state.fetchDefaultUserGroups,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_FAILURE:
            return Object.assign({}, state, {
                fetchDefaultUserGroups: {
                    ...state.fetchDefaultUserGroups,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_EVENT_TYPE_REQUEST:
            return Object.assign({}, state, {
                eventType: {
                    ...state.eventType,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_EVENT_TYPE_SUCCESS:
            return Object.assign({}, state, {
                eventType: {
                    ...state.eventType,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_EVENT_TYPE_FAILURE:
            return Object.assign({}, state, {
                eventType: {
                    ...state.eventType,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.FETCH_STATE_REQUEST:
            return Object.assign({}, state, {
                stateList: {
                    ...state.stateList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_STATE_SUCCESS:
            return Object.assign({}, state, {
                stateList: {
                    ...state.stateList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        case ActionTypes.FETCH_STATE_FAILURE:
            return Object.assign({}, state, {
                stateList: {
                    ...state.stateList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                districtList: {
                    ...state.districtList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DISTRICT_SUCCESS:
            return Object.assign({}, state, {
                districtList: {
                    ...state.districtList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DISTRICT_FAILURE:
            return Object.assign({}, state, {
                districtList: {
                    ...state.districtList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_LSGI_REQUEST:
            return Object.assign({}, state, {
                lsgiList: {
                    ...state.lsgiList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_LSGI_SUCCESS:
            return Object.assign({}, state, {
                lsgiList: {
                    ...state.lsgiList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_LSGI_FAILURE:
            return Object.assign({}, state, {
                lsgiList: {
                    ...state.lsgiList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_LSGI_TYPE_REQUEST:
            return Object.assign({}, state, {
                lsgiTypeList: {
                    ...state.lsgiTypeList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_LSGI_TYPE_SUCCESS:
            return Object.assign({}, state, {
                lsgiTypeList: {
                    ...state.lsgiTypeList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_LSGI_TYPE_FAILURE:
            return Object.assign({}, state, {
                lsgiTypeList: {
                    ...state.lsgiTypeList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_ONLINE_PLATFORMS_REQUEST:
            return Object.assign({}, state, {
                onlinePlatformList: {
                    ...state.onlinePlatformList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_ONLINE_PLATFORMS_SUCCESS:
            return Object.assign({}, state, {
                onlinePlatformList: {
                    ...state.onlinePlatformList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_ONLINE_PLATFORMS_FAILURE:
            return Object.assign({}, state, {
                onlinePlatformList: {
                    ...state.onlinePlatformList,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.CLEAR_EVENT_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchEventById: {}
            });
        default:
            return state;

    }
};
export default reducer;

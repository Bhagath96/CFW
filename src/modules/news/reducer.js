import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';


const initialState = {

    listNewsDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchNewsById: {
        data: {},
        requestInProgress: false
    },
    fetchRolesByHashTagId: {
        data: [],
        requestInProgress: false
    },
    fetchUserGroupByHashTagId: {
        data: [],
        requestInProgress: false
    },
    defaultRole: {
        data: []
    },
    defaultUserGroup: {
        data: []
    }

};
let listNewsResponse = {};

const formatData = (data = {}) => {
    data.labels = data?.labels?.map((item) => {
        item.clicked = true;
        return item;
    });
    return data;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_REQUEST:
            return Object.assign({}, state, {
                defaultRole: {
                    ...initialState.defaultRole,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_SUCCESS:
            return Object.assign({}, state, {
                defaultRole: {
                    ...state.defaultRole,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_FAILURE:
            return Object.assign({}, state, {
                defaultRole: {
                    ...initialState.defaultRole
                }
            });

        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_REQUEST:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...initialState.defaultUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_SUCCESS:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...state.defaultUserGroup,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_FAILURE:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...initialState.defaultUserGroup
                }
            });

        case ActionTypes.GET_ROLE_FOR_NEWS_REQUEST:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...initialState.fetchRolesByHashTagId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ROLE_FOR_NEWS_SUCCESS:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...state.fetchRolesByHashTagId,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_ROLE_FOR_NEWS_FAILURE:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...initialState.fetchRolesByHashTagId
                }
            });

        case ActionTypes.GET_USER_GROUP_FOR_NEWS_REQUEST:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...initialState.fetchUserGroupByHashTagId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_USER_GROUP_FOR_NEWS_SUCCESS:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...state.fetchUserGroupByHashTagId,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_USER_GROUP_FOR_NEWS_FAILURE:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...initialState.fetchUserGroupByHashTagId
                }
            });


        case ActionTypes.FETCH_NEWS_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listNewsDetails: {
                    ...initialState.listNewsDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_NEWS_DETAILS_SUCCESS:
            listNewsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listNewsDetails: {
                    ...state.listNewsDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listNewsResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_NEWS_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listNewsDetails: {
                    ...initialState.listNewsDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_NEWS_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchNewsById: {
                    ...state.fetchNewsById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_NEWS_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchNewsById: {
                    ...state.fetchNewsById,
                    requestInProgress: false,
                    data: formatData(getPayloadData(action.payload, {}))
                }
            });
        case ActionTypes.FETCH_NEWS_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchNewsById: {
                    ...state.fetchNewsById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_NEWS_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchNewsById: {}
            });
        default:
            return state;

    }
};
export default reducer;

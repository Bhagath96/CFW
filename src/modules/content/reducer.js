import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';


const initialState = {

    listContentDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchContentById: {
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
const formData = (data = {}) => {
    data.labels = data?.labels?.map((item) => {
        item.clicked = true;
        return item;
    });
    return data;
};

let listContentResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_REQUEST:
            return Object.assign({}, state, {
                defaultRole: {
                    ...initialState.defaultRole,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_SUCCESS:
            return Object.assign({}, state, {
                defaultRole: {
                    ...state.defaultRole,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_FAILURE:
            return Object.assign({}, state, {
                defaultRole: {
                    ...initialState.defaultRole
                }
            });

        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_REQUEST:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...initialState.defaultUserGroup,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_SUCCESS:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...state.defaultUserGroup,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_FAILURE:
            return Object.assign({}, state, {
                defaultUserGroup: {
                    ...initialState.defaultUserGroup
                }
            });

        case ActionTypes.GET_ROLE_FOR_CONTENT_REQUEST:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...initialState.fetchRolesByHashTagId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ROLE_FOR_CONTENT_SUCCESS:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...state.fetchRolesByHashTagId,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_ROLE_FOR_CONTENT_FAILURE:
            return Object.assign({}, state, {
                fetchRolesByHashTagId: {
                    ...initialState.fetchRolesByHashTagId
                }
            });

        case ActionTypes.GET_USER_GROUP_FOR_CONTENT_REQUEST:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...initialState.fetchUserGroupByHashTagId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_USER_GROUP_FOR_CONTENT_SUCCESS:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...state.fetchUserGroupByHashTagId,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_USER_GROUP_FOR_CONTENT_FAILURE:
            return Object.assign({}, state, {
                fetchUserGroupByHashTagId: {
                    ...initialState.fetchUserGroupByHashTagId
                }
            });


        case ActionTypes.FETCH_CONTENT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listContentDetails: {
                    ...initialState.listContentDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CONTENT_DETAILS_SUCCESS:
            listContentResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listContentDetails: {
                    ...state.listContentDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listContentResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_CONTENT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listContentDetails: {
                    ...initialState.listContentDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchContentById: {
                    ...state.fetchContentById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchContentById: {
                    ...state.fetchContentById,
                    requestInProgress: false,
                    data: formData(getPayloadData(action.payload, {}))
                }
            });
        case ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchContentById: {
                    ...state.fetchContentById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_CONTENT_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchContentById: {}
            });
        default:
            return state;

    }
};
export default reducer;

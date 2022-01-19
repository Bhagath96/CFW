import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData, formatCheckBoxesFromAPI } from '../../utils/ApiUtils';

const initialState = {
    listComplaintConfig: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    getComplaintConfigById: {
        data: {},
        requestInProgress: false
    },
    assignComplaintConfigsView: {

    },
    // roleAssignComplaintConfigsView: {

    // },
    commonTemplate: {
        selected: 0
    }

};
let listComplaintConfigResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_COMPLAINT_CONFIG_FORM:
            return Object.assign({}, state, {
                getComplaintConfigById: {
                }
            });
        case ActionTypes.LIST_COMPLAINT_CONFIG_REQUEST:
            return Object.assign({}, state, {
                listComplaintConfig: {
                    ...state.listComplaintConfig,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_COMPLAINT_CONFIG_SUCCESS:
            listComplaintConfigResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listComplaintConfig: {
                    data: listComplaintConfigResponse,
                    searchKeys: formatFilterSearchKeys(_.get(listComplaintConfigResponse, 'searchKeys', [])),
                    requestInProgress: false
                }
            });

        case ActionTypes.LIST_COMPLAINT_CONFIG_FAILURE:
            return Object.assign({}, state, {
                listComplaintConfig: {
                    ...state.listComplaintConfig,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getComplaintConfigById: {
                    ...state.getComplaintConfigById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.SET_COMPLAINT_CONFIG_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getComplaintConfigById: {
                    ...state.getComplaintConfigById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getComplaintConfigById: {
                    ...state.getComplaintConfigById,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                assignComplaintConfigList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                assignComplaintConfigList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignComplaintConfigsView: {
                    ...state.assignComplaintConfigsView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                assignComplaintConfigList: {
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

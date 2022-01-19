import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listBlockPanchayathDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        error: {},
        searchKeys: []
    },
    fetchBlockPanchayathById: {
        data: {},
        requestInProgress: false
    },
    fetchStateList: {
        data: {},
        requestInProgress: false
    },
    fetchDistrictList: {
        data: {},
        requestInProgress: false
    }
};
let listBlockPanchayathResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...initialState.listBlockPanchayathDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_SUCCESS:
            listBlockPanchayathResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...state.listBlockPanchayathDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listBlockPanchayathResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...initialState.listBlockPanchayathDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
                    requestInProgress: false,
                    data: []
                }
            });
        case CommonActionTypes.LIST_STATES_REQUEST:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: true,
                    data: []
                }
            });
        case CommonActionTypes.LIST_STATES_SUCCESS:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case CommonActionTypes.LIST_STATES_FAILURE:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.CLEAR_BLOCK_PANCHAYATH_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                }
            });
        default:
            return state;

    }
};
export default reducer;

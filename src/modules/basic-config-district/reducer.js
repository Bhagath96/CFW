import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listDistrictDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        error: {},
        searchKeys: []
    },
    fetchDistrictById: {
        data: {},
        requestInProgress: false
    },
    fetchStateList: {
        data: {},
        requestInProgress: false
    },
    listFilterDataForDistrictFilter: {},
    currentFilterState: {}
};
let listDistrictResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DISTRICT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...initialState.listDistrictDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_SUCCESS:
            listDistrictResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...state.listDistrictDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listDistrictResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...initialState.listDistrictDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
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
        case ActionTypes.CLEAR_DISTRICT_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchDistrictById: {
                }
            });
        default:
            return state;

    }
};
export default reducer;

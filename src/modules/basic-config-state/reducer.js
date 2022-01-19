import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';


const initialState = {

    listStateDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    fetchStateById: {
        data: {},
        requestInProgress: false
    }

};
let listStateResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STATE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listStateDetails: {
                    ...initialState.listStateDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_SUCCESS:
            listStateResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStateDetails: {
                    ...state.listStateDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listStateResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listStateDetails: {
                    ...initialState.listStateDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_STATE_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchStateById: {}
            });
        default:
            return state;

    }
};
export default reducer;

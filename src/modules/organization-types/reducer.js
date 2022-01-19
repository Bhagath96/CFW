import { types as ActionTypes } from './actions';
import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listOrganizationType: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        error: {}
    },
    getOrganizationTypeById: {
        data: {
            isLsgiType: false
        },
        requestInProgress: false
    }

};
let listOrganizationTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getOrganizationTypeById: {
                }
            });
        case ActionTypes.LIST_ORGANIZATION_TYPE_REQUEST:
            return Object.assign({}, state, {
                listOrganizationType: {
                    ...state.listOrganizationType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_ORGANIZATION_TYPE_SUCCESS:
            listOrganizationTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganizationType: {
                    data: listOrganizationTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listOrganizationTypeResponce, 'searchKeys', [])),
                    requestInProgress: false
                }
            });

        case ActionTypes.LIST_ORGANIZATION_TYPE_FAILURE:
            return Object.assign({}, state, {
                listOrganizationType: {
                    ...state.listOrganizationType,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getOrganizationTypeById: {
                    ...state.getOrganizationTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getOrganizationTypeById: {
                    ...state.getOrganizationTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getOrganizationTypeById: {
                    ...state.getOrganizationTypeById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;

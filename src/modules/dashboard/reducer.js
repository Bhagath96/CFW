import utils from '../../utils';
import { types as ActionTypes } from './actions';
const { apiUtils: { getPayloadData } } = utils;

const initialState = {
    districtList: {
        data: []
    },
    LSGITypeList: {
        data: []
    },
    LSGIList: {
        data: []
    },
    childCount: {
        data: 0
    },
    parentCount: {
        data: 0
    },
    teachersCount: {
        data: 0
    },
    generalPublic: {
        data: 0
    },
    officialCount: {
        data: 0
    },
    complaintCount: {
        data: 0
    }


};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.LOAD_DISTRICT_REQUEST: {
            return Object.assign({}, state, {
                districtList: {
                    data: {},
                    requestInProgress: true

                }
            });
        }
        case ActionTypes.LOAD_DISTRICT_SUCCESS: {
            return Object.assign({}, state, {
                districtList: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_DISTRICT_FAILURE: {
            return Object.assign({}, state, {
                districtList: {
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_LSGI_TYPE_REQUEST: {
            return Object.assign({}, state, {
                LSGITypeList: {
                    data: {},
                    requestInProgress: true

                }
            });
        }
        case ActionTypes.LOAD_LSGI_TYPE_SUCCESS: {
            return Object.assign({}, state, {
                LSGITypeList: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_LSGI_TYPE_FAILURE: {
            return Object.assign({}, state, {
                LSGITypeList: {
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_LSGI_REQUEST: {
            return Object.assign({}, state, {
                LSGIList: {
                    data: {},
                    requestInProgress: true

                }
            });
        }
        case ActionTypes.LOAD_LSGI_SUCCESS: {
            return Object.assign({}, state, {
                LSGIList: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_LSGI_FAILURE: {
            return Object.assign({}, state, {
                LSGIList: {
                    requestInProgress: false

                }
            });
        }
        case ActionTypes.LOAD_TOTAL_CHILD_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                childCount: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }
        case ActionTypes.LOAD_TOTAL_PARENT_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                parentCount: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }
        case ActionTypes.LOAD_TOTAL_TEACHERS_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                teachersCount: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }
        case ActionTypes.LOAD_TOTAL_GENERAL_PUBLIC_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                generalPublic: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }
        case ActionTypes.LOAD_TOTAL_OFFICIALS_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                officialCount: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }
        case ActionTypes.LOAD_TOTAL_COMPLAINT_RECEIVED_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                complaintCount: {
                    data: getPayloadData(action.payload, 0)
                }
            });
        }

        default: return state;
    }

};

export default reducer;

import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchDistrictDetailsAPI({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_DISTRICT_DETAILS_REQUEST, ActionTypes.FETCH_DISTRICT_DETAILS_SUCCESS, ActionTypes.FETCH_DISTRICT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT,
        api: restAPI.get,
        payload
    };
}
export function saveDistrict(data) {
    let payload = {
        types: [ActionTypes.SAVE_DISTRICT_DETAILS_REQUEST, ActionTypes.SAVE_DISTRICT_DETAILS_SUCCESS, ActionTypes.SAVE_DISTRICT_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_DISTRICT,
        api: restAPI.post,
        payload
    };
}
export function deleteDistrict(data) {
    let payload = {
        types: [ActionTypes.DELETE_DISTRICT_DETAILS_REQUEST, ActionTypes.DELETE_DISTRICT_DETAILS_SUCCESS, ActionTypes.DELETE_DISTRICT_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_DISTRICT.replace(':districtId', data),
        api: restAPI.del,
        payload
    };
}
export function updateDistrict(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_DISTRICT_DETAILS_REQUEST, ActionTypes.UPDATE_DISTRICT_DETAILS_SUCCESS, ActionTypes.UPDATE_DISTRICT_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_DISTRICT.replace(':districtId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchDistrictDataById({ langId, distId }) {
    let payload = {
        types: [ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_STATE_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.FETCH_DISTRICT_BY_ID.replace(':districtId', distId),
        api: restAPI.get,
        payload
    };
}


import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchLSGIDetailsAPI({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_LSGI_DETAILS_REQUEST, ActionTypes.FETCH_LSGI_DETAILS_SUCCESS, ActionTypes.FETCH_LSGI_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}
export function saveLSGI(data) {
    let payload = {
        types: [ActionTypes.SAVE_LSGI_DETAILS_REQUEST, ActionTypes.SAVE_LSGI_DETAILS_SUCCESS, ActionTypes.SAVE_LSGI_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_LSGI,
        api: restAPI.post,
        payload
    };
}
export function deleteLSGI(data) {
    let payload = {
        types: [ActionTypes.DELETE_LSGI_DETAILS_REQUEST, ActionTypes.DELETE_LSGI_DETAILS_SUCCESS, ActionTypes.DELETE_LSGI_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_LSGI.replace(':lsgisId', data),
        api: restAPI.del,
        payload
    };
}
export function updateLSGI(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_LSGI_DETAILS_REQUEST, ActionTypes.UPDATE_LSGI_DETAILS_SUCCESS, ActionTypes.UPDATE_LSGI_DETAILS_SUCCESS],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_LSGI.replace(':lsgisId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchLSGIDataById({ langId, lsgiId }) {
    let payload = {
        types: [ActionTypes.FETCH_LSGI_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_LSGI_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_LSGI_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.FETCH_LSGI_BY_ID.replace(':lsgisId', lsgiId),
        api: restAPI.get,
        payload
    };
}
export function fetchDistrict(stateIds) {
    let payload = {
        types: [ActionTypes.LIST_DISTRICT_REQUEST, ActionTypes.LIST_DISTRICT_SUCCESS, ActionTypes.LIST_DISTRICT_FAILURE],
        params: { stateId: stateIds, type: 'dropdown' }

    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT,
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForBasicConfig({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_LSGI_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_LSGI_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_LSGI_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}
export function loadLSGITypes() {
    let payload = {
        types: [ActionTypes.LOAD_LSGI_TYPES_REQUEST, ActionTypes.LOAD_LSGI_TYPES_SUCCESS, ActionTypes.LOAD_LSGI_TYPES_FAILURE]
    };
    return {
        url: URL.COMMON.LOAD_LSGI_TYPES,
        api: restAPI.get,
        payload
    };
}
export function loadBlockPanchayath({ districtId }) {
    let payload = {
        types: [
            ActionTypes.LOAD_BLOCK_PANCHAYATH_REQUEST,
            ActionTypes.LOAD_BLOCK_PANCHAYATH_SUCCESS,
            ActionTypes.LOAD_BLOCK_PANCHAYATH_FAILURE
        ],
        params: { districtId: districtId, type: 'dropdown' }
    };
    return {
        url: URL.ORGANIZATION.LOAD_BLOCK_PANCHAYATHS,
        api: restAPI.get,
        payload
    };
}


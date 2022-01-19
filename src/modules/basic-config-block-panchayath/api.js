import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchBlockPanchayathDetailsAPI({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_REQUEST, ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_BLOCK_PANCHAYATH,
        api: restAPI.get,
        payload
    };
}
export function saveBlockPanchayath(data) {
    let payload = {
        types: [ActionTypes.SAVE_BLOCK_PANCHAYATH_DETAILS_REQUEST, ActionTypes.SAVE_BLOCK_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.SAVE_BLOCK_PANCHAYATH_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_BLOCK_PANCHAYATH,
        api: restAPI.post,
        payload
    };
}
export function deleteBlockPanchayath(data) {
    let payload = {
        types: [ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS_REQUEST, ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_BLOCK_PANCHAYATH.replace(':blockPanchayathId', data),
        api: restAPI.del,
        payload
    };
}
export function updateBlockPanchayath(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_BLOCK_PANCHAYATH_DETAILS_REQUEST, ActionTypes.UPDATE_BLOCK_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.UPDATE_BLOCK_PANCHAYATH_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_BLOCK_PANCHAYATH.replace(':blockPanchayathId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchBlockPanchayathDataById({ langId, distId }) {
    let payload = {
        types: [ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.FETCH_BLOCK_PANCHAYATH_BY_ID.replace(':blockPanchayathId', distId),
        api: restAPI.get,
        payload
    };
}
export function fetchDistrict(stateId) {
    const type = 'dropdown';
    let payload = {
        types: [ActionTypes.LIST_DISTRICT_LIST_BY_STATE_REQUEST, ActionTypes.LIST_DISTRICT_LIST_BY_STATE_SUCCESS, ActionTypes.LIST_DISTRICT_LIST_BY_STATE_FAILURE],
        params: { stateId, type }

    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT,
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForBasicConfig({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_BLOCK_PANCHAYATH_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_BLOCK_PANCHAYATH_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_BLOCK_PANCHAYATH_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_BLOCK_PANCHAYATH,
        api: restAPI.get,
        payload
    };
}


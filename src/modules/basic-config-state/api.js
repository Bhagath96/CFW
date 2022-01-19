import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchStateDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_STATE_DETAILS_REQUEST, ActionTypes.FETCH_STATE_DETAILS_SUCCESS, ActionTypes.FETCH_STATE_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_STATE,
        api: restAPI.get,
        payload
    };
}
export function saveState(data) {
    let payload = {
        types: [ActionTypes.SAVE_STATE_DETAILS_REQUEST, ActionTypes.SAVE_STATE_DETAILS_SUCCESS, ActionTypes.SAVE_STATE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_STATE,
        api: restAPI.post,
        payload
    };
}
export function deleteState(data) {
    let payload = {
        types: [ActionTypes.DELETE_STATE_DETAILS_REQUEST, ActionTypes.DELETE_STATE_DETAILS_SUCCESS, ActionTypes.DELETE_STATE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_STATE.replace(':stateId', data),
        api: restAPI.del,
        payload
    };
}
export function updateState(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_STATE_DETAILS_REQUEST, ActionTypes.UPDATE_STATE_DETAILS_SUCCESS, ActionTypes.UPDATE_STATE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_STATE.replace(':stateId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchStateById({ langId, stateID }) {
    let payload = {
        types: [ActionTypes.FETCH_STATE_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_STATE_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_STATE_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_STATE.replace(':stateId', stateID),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForBasicConfig({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_STATE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_STATE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_STATE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_STATE,
        api: restAPI.get,
        payload
    };
}


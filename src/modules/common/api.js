import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function loadLanguages() {
    let payload = {
        types: [ActionTypes.GET_ALL_LANGUAGES_REQUEST, ActionTypes.GET_ALL_LANGUAGES_SUCCESS, ActionTypes.GET_ALL_LANGUAGES_FAILED]
    };
    return {
        url: URL.COMMON.LOAD_LANGUAGES,
        api: restAPI.get,
        payload
    };
}
export function fetchState() {
    let payload = {
        types: [ActionTypes.LIST_STATES_REQUEST, ActionTypes.LIST_STATES_SUCCESS, ActionTypes.LIST_STATES_FAILURE]
    };
    return {
        url: URL.COMMON.LIST_STATE,
        api: restAPI.get,
        payload
    };
}


export function fetchTableDropdownFilterList({ type, searchValue, searchKey, langId, url }) {
    let payload = {
        types: [
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE],
        params: { type, searchValue, searchKey, langId }
    };
    return {
        url,
        api: restAPI.get,
        payload
    };
}

export function loadStates(params) {
    let payload = {
        types: [ActionTypes.LIST_STATES_REQUEST, ActionTypes.LIST_STATES_SUCCESS, ActionTypes.LIST_STATES_FAILURE],
        params
    };
    return {
        url: URL.COMMON.LIST_STATE,
        api: restAPI.get,
        payload
    };
}

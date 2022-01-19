import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchEventDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_EVENT_DETAILS_REQUEST, ActionTypes.FETCH_EVENT_DETAILS_SUCCESS, ActionTypes.FETCH_EVENT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.EVENT.LIST_EVENT,
        api: restAPI.get,
        payload
    };
}
export function saveEvent(formData) {
    let payload = {
        types: [ActionTypes.SAVE_EVENT_DETAILS_REQUEST, ActionTypes.SAVE_EVENT_DETAILS_SUCCESS, ActionTypes.SAVE_EVENT_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.EVENT.SAVE_EVENT,
        api: restAPI.postformData,
        payload
    };
}
export function deleteEvent(data) {
    let payload = {
        types: [ActionTypes.DELETE_EVENT_DETAILS_REQUEST, ActionTypes.DELETE_EVENT_DETAILS_SUCCESS, ActionTypes.DELETE_EVENT_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.EVENT.DELETE_EVENT.replace(':eventId', data),
        api: restAPI.del,
        payload
    };
}
export function fetchEventById({ langId, eventId }) {
    let payload = {
        types: [ActionTypes.FETCH_EVENT_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_EVENT_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_EVENT_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.EVENT.GET_EVENT_BY_ID.replace(':eventId', eventId),
        api: restAPI.get,
        payload
    };
}
export function updateEvent(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_EVENT_DETAILS_REQUEST, ActionTypes.UPDATE_EVENT_DETAILS_SUCCESS, ActionTypes.UPDATE_EVENT_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.EVENT.UPDATE_EVENT_BY_ID.replace(':eventId', id),
        api: restAPI.putformData,
        payload
    };
}

export function fetchRolesDetails(langId) {
    const type = 'dropdown';
    const module = 'event';
    let payload = {
        types: [ActionTypes.FETCH_ROLES_DETAILS_REQUEST, ActionTypes.FETCH_ROLES_DETAILS_SUCCESS, ActionTypes.FETCH_ROLES_DETAILS_FAILURE],
        params: { type, module, langId: langId }

    };
    return {
        url: URL.EVENT.LIST_ROLES,
        api: restAPI.get,
        payload
    };
}
export function fetchDefaultRolesDetails(langId) {
    let payload = {
        types: [ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_REQUEST, ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_SUCCESS, ActionTypes.FETCH_DEFAULT_ROLES_DETAILS_FAILURE],
        params: { type: 'dropdown', langId: langId }

    };
    return {
        url: URL.EVENT.LIST_DEFAULT_ROLES,
        api: restAPI.get,
        payload
    };
}
export function fetchUserGroupsDetails(langId) {
    let payload = {
        types: [ActionTypes.FETCH_USER_GROUPS_DETAILS_REQUEST, ActionTypes.FETCH_USER_GROUPS_DETAILS_SUCCESS, ActionTypes.FETCH_USER_GROUPS_DETAILS_FAILURE],
        params: { langId: langId }
    };
    return {
        url: URL.EVENT.LIST_USER_GROUPS,
        api: restAPI.get,
        payload
    };
}
export function fetchDefaultUserGroupsDetails(langId) {
    let payload = {
        types: [ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_REQUEST, ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_SUCCESS, ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS_FAILURE],
        params: { type: 'dropdown', langId: langId }

    };
    return {
        url: URL.EVENT.LIST_DEFAULT_USER_GROUPS,
        api: restAPI.get,
        payload
    };
}
export function fetchEventType(langId) {
    let payload = {
        types: [ActionTypes.FETCH_EVENT_TYPE_REQUEST, ActionTypes.FETCH_EVENT_TYPE_SUCCESS, ActionTypes.FETCH_EVENT_TYPE_FAILURE],
        params: { langId: langId }
    };
    return {
        url: URL.EVENT.LIST_EVENT_TYPE,
        api: restAPI.get,
        payload
    };
}

export function fetchState(langId) {
    let payload = {
        types: [ActionTypes.FETCH_STATE_REQUEST, ActionTypes.FETCH_STATE_SUCCESS, ActionTypes.FETCH_STATE_FAILURE],
        params: { type: 'dropdown', langId: langId }

    };
    return {
        url: URL.BASIC_CONFIG.LIST_STATE,
        api: restAPI.get,
        payload
    };
}
export function fetchDistrict({ data, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_DISTRICT_REQUEST, ActionTypes.FETCH_DISTRICT_SUCCESS, ActionTypes.FETCH_DISTRICT_FAILURE],
        params: { type: 'dropdown', stateId: data, langId: langId }

    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT,
        api: restAPI.get,
        payload
    };
}
export function fetchLSGITypes(langId) {
    let payload = {
        types: [ActionTypes.FETCH_LSGI_TYPE_REQUEST, ActionTypes.FETCH_LSGI_TYPE_SUCCESS, ActionTypes.FETCH_LSGI_TYPE_FAILURE],
        params: { langId: langId }
    };
    return {
        url: URL.COMMON.LOAD_LSGI_TYPES,
        api: restAPI.get,
        payload
    };
}
export function fetchLSGI(params) {
    let payload = {
        types: [ActionTypes.FETCH_LSGI_REQUEST, ActionTypes.FETCH_LSGI_SUCCESS, ActionTypes.FETCH_LSGI_FAILURE],
        ...params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}
export function fetchOnlinePlatform(langId) {
    let payload = {
        types: [ActionTypes.FETCH_ONLINE_PLATFORMS_REQUEST, ActionTypes.FETCH_ONLINE_PLATFORMS_SUCCESS, ActionTypes.FETCH_ONLINE_PLATFORMS_FAILURE],
        params: { type: 'dropdown', langId: langId }

    };
    return {
        url: URL.EVENT.LIST_ONLINE_PLATFORMS,
        api: restAPI.get,
        payload
    };
}


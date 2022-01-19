import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listComplaintConfig({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function sentComplaintConfig(data) {
    let payload = {
        types: [ActionTypes.SENT_COMPLAINT_CONFIG_REQUEST, ActionTypes.SENT_COMPLAINT_CONFIG_SUCCESS, ActionTypes.SENT_COMPLAINT_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG,
        api: restAPI.post,
        payload
    };
}


export function editComplaintConfig(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_COMPLAINT_CONFIG_REQUEST, ActionTypes.EDIT_COMPLAINT_CONFIG_SUCCESS, ActionTypes.EDIT_COMPLAINT_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG_BYID.replace(':complaintConfigId', id),
        api: restAPI.put,
        payload
    };
}

export function getComplaintConfigById(id) {
    let payload = {
        types: [ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_REQUEST, ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_SUCCESS, ActionTypes.GET_COMPLAINT_CONFIG_BY_ID_FAILURE]
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG_BYID.replace(':complaintConfigId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteComplaintConfig(data) {
    let payload = {
        types: [ActionTypes.DELETE_COMPLAINT_CONFIG_REQUEST, ActionTypes.DELETE_COMPLAINT_CONFIG_SUCCESS, ActionTypes.DELETE_COMPLAINT_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG_BYID.replace(':complaintConfigId', data),
        api: restAPI.del,
        payload
    };
}

export function fetchComplaintConfig(Id) {
    let payload = {
        types: [ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_REQUEST, ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_SUCCESS, ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK_FAILURE]
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG_SERVICE_CONFIG.replace(':complaintConfigId', Id),
        api: restAPI.get,
        payload
    };
}

export function saveComplaintConfig(Id, body) {
    let payload = {
        types: [ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_REQUEST, ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_SUCCESS, ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_FAILURE],
        body
    };
    return {
        url: URL.COMPLAINT_CONFIG.COMPLAINT_CONFIG_SERVICE_CONFIG.replace(':complaintConfigId', Id),
        api: restAPI.put,
        payload
    };
}



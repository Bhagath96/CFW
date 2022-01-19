import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listOrganizationType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.ORGANIZATION_TYPE.LIST_ORGANIZATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function listJsonForOrganizationTypeFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_ORGANIZATION_TYPE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_ORGANIZATION_TYPE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_ORGANIZATION_TYPE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.ORGANIZATION_TYPE.LIST_ORGANIZATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentOrganizationType(data) {
    let payload = {
        types: [ActionTypes.SENT_ORGANIZATION_TYPE_REQUEST, ActionTypes.SENT_ORGANIZATION_TYPE_SUCCESS, ActionTypes.SENT_ORGANIZATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ORGANIZATION_TYPE.LIST_ORGANIZATION_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editOrganizationType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_ORGANIZATION_TYPE_REQUEST, ActionTypes.EDIT_ORGANIZATION_TYPE_SUCCESS, ActionTypes.EDIT_ORGANIZATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ORGANIZATION_TYPE.EDIT_ORGANIZATION_TYPE.replace(':organizationTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getOrganizationTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_REQUEST, ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_SUCCESS, ActionTypes.GET_ORGANIZATION_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.ORGANIZATION_TYPE.GET_ORGANIZATION_TYPE_BY_ID.replace(':organizationTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteOrganizationType(data) {
    let payload = {
        types: [ActionTypes.DELETE_ORGANIZATION_TYPE_REQUEST, ActionTypes.DELETE_ORGANIZATION_TYPE_SUCCESS, ActionTypes.DELETE_ORGANIZATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ORGANIZATION_TYPE.GET_ORGANIZATION_TYPE_BY_ID.replace(':organizationTypeId', data),
        api: restAPI.del,
        payload
    };
}



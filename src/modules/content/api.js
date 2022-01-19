import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
import { type } from './constant';

export function fetchContentDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_CONTENT_DETAILS_REQUEST, ActionTypes.FETCH_CONTENT_DETAILS_SUCCESS, ActionTypes.FETCH_CONTENT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CONTENT.LIST_CONTENT,
        api: restAPI.get,
        payload
    };
}

export function fetchRole() {
    const module = 'content';
    let payload = {
        types: [ActionTypes.GET_ROLE_FOR_CONTENT_REQUEST, ActionTypes.GET_ROLE_FOR_CONTENT_SUCCESS, ActionTypes.GET_ROLE_FOR_CONTENT_FAILURE],
        params: { type, module }
    };
    return {
        url: URL.EVENT.LIST_ROLES,
        api: restAPI.get,
        payload
    };
}

export function fetchUserGroup() {
    let payload = {
        types: [ActionTypes.GET_USER_GROUP_FOR_CONTENT_REQUEST, ActionTypes.GET_USER_GROUP_FOR_CONTENT_SUCCESS, ActionTypes.GET_USER_GROUP_FOR_CONTENT_FAILURE],
        params: { type }
    };
    return {
        url: URL.EVENT.LIST_USER_GROUPS,
        api: restAPI.get,
        payload
    };
}

export function fetchDefaultRole() {
    let payload = {
        types: [ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_REQUEST, ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_SUCCESS, ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_FAILURE],
        params: { type }
    };
    return {
        url: URL.CONTENT.LIST_DEFAULT_ROLES,
        api: restAPI.get,
        payload
    };
}

export function fetchDefaultUserGroup() {
    let payload = {
        types: [ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_REQUEST, ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_SUCCESS, ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT_FAILURE],
        params: { type }
    };
    return {
        url: URL.CONTENT.LIST_DEFAULT_USER_GROUPS,
        api: restAPI.get,
        payload
    };
}

export function saveContent(formData) {
    let payload = {
        types: [ActionTypes.SAVE_CONTENT_DETAILS_REQUEST, ActionTypes.SAVE_CONTENT_DETAILS_SUCCESS, ActionTypes.SAVE_CONTENT_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.CONTENT.SAVE_CONTENT,
        api: restAPI.postformData,
        payload
    };
}
export function deleteContent({ id }) {
    let payload = {
        types: [ActionTypes.DELETE_CONTENT_DETAILS_REQUEST, ActionTypes.DELETE_CONTENT_DETAILS_SUCCESS, ActionTypes.DELETE_CONTENT_DETAILS_FAILURE]
    };
    return {
        url: URL.CONTENT.DELETE_CONTENT.replace(':contentId', id),
        api: restAPI.del,
        payload
    };
}
export function fetchContentById({ langId, ContentId }) {
    let payload = {
        types: [ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_CONTENT_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.CONTENT.GET_CONTENT_BY_ID.replace(':contentId', ContentId),
        api: restAPI.get,
        payload
    };
}
export function updateContent({ formData, id }) {
    let payload = {
        types: [ActionTypes.UPDATE_CONTENT_DETAILS_REQUEST, ActionTypes.UPDATE_CONTENT_DETAILS_SUCCESS, ActionTypes.UPDATE_CONTENT_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.CONTENT.UPDATE_CONTENT_BY_ID.replace(':contentId', id),
        api: restAPI.putformData,
        payload
    };
}

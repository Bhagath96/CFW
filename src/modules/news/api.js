import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
import { type, hashTagId } from './constant';

export function fetchNewsDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_NEWS_DETAILS_REQUEST, ActionTypes.FETCH_NEWS_DETAILS_SUCCESS, ActionTypes.FETCH_NEWS_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.NEWS.LIST_NEWS,
        api: restAPI.get,
        payload
    };
}

export function fetchRoleForNews({ langId }) {
    let payload = {
        types: [ActionTypes.GET_ROLE_FOR_NEWS_REQUEST, ActionTypes.GET_ROLE_FOR_NEWS_SUCCESS, ActionTypes.GET_ROLE_FOR_NEWS_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.NEWS.GET_ALL_ROLE,
        api: restAPI.get,
        payload
    };
}


export function fetchUserGroupForNews({ langId }) {
    let payload = {
        types: [ActionTypes.GET_USER_GROUP_FOR_NEWS_REQUEST, ActionTypes.GET_USER_GROUP_FOR_NEWS_SUCCESS, ActionTypes.GET_USER_GROUP_FOR_NEWS_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.NEWS.GET_ALL_USER_GROUP,
        api: restAPI.get,
        payload
    };
}

export function fetchDefaultRoleForNews({ langId }) {
    let payload = {
        types: [ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_REQUEST, ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_SUCCESS, ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.NEWS.GET_ROLE.replace(':topicId', hashTagId),
        api: restAPI.get,
        payload
    };
}

export function fetchDefaultUserGroupForNews({ langId }) {
    let payload = {
        types: [ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_REQUEST, ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_SUCCESS, ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.NEWS.GET_USER_GROUP.replace(':topicId', hashTagId),
        api: restAPI.get,
        payload
    };
}

export function saveNews({ formData }) {

    let payload = {
        types: [ActionTypes.SAVE_NEWS_DETAILS_REQUEST, ActionTypes.SAVE_NEWS_DETAILS_SUCCESS, ActionTypes.SAVE_NEWS_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.NEWS.SAVE_NEWS,
        api: restAPI.postformData,
        payload
    };
}
export function deleteNews({ id }) {
    let payload = {
        types: [ActionTypes.DELETE_NEWS_DETAILS_REQUEST, ActionTypes.DELETE_NEWS_DETAILS_SUCCESS, ActionTypes.DELETE_NEWS_DETAILS_FAILURE]
    };
    return {
        url: URL.NEWS.DELETE_NEWS.replace(':newsId', id),
        api: restAPI.del,
        payload
    };
}
export function fetchNewsById({ langId, NewsId }) {
    let payload = {
        types: [ActionTypes.FETCH_NEWS_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_NEWS_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_NEWS_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.NEWS.FETCH_NEWS_BY_ID.replace(':newsId', NewsId),
        api: restAPI.get,
        payload
    };
}
export function updateNews({ formData, id }) {
    let payload = {
        types: [ActionTypes.UPDATE_NEWS_DETAILS_REQUEST, ActionTypes.UPDATE_NEWS_DETAILS_SUCCESS, ActionTypes.UPDATE_NEWS_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.NEWS.UPDATE_NEWS.replace(':newsId', id),
        api: restAPI.putformData,
        payload
    };
}

import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
export function saveUserGroup(data) {
    let payload = {
        types: [ActionTypes.SAVE_USER_GROUP_REQUEST, ActionTypes.SAVE_USER_GROUP_SUCCESS, ActionTypes.SAVE_USER_GROUP_FAILED],
        body: data
    };
    return {
        url: URL.USER_GROUP.SAVE_USER_GROUP,
        api: restAPI.post,
        payload
    };
}

export function updateUserGroup({ userGroupId, data }) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_GROUP_REQUEST, ActionTypes.UPDATE_USER_GROUP_SUCCESS, ActionTypes.UPDATE_USER_GROUP_FAILED],
        body: data
    };
    return {
        url: `${URL.USER_GROUP.UPDATE_USER_GROUP}/${userGroupId}`,
        api: restAPI.put,
        payload
    };
}

export function listUserGroup({ params }) {
    let payload = {
        types: [ActionTypes.LIST_USER_GROUP_REQUEST, ActionTypes.LIST_USER_GROUP_SUCCESS, ActionTypes.LIST_USER_GROUP_FAILED],
        params: params
    };
    return {
        url: URL.USER_GROUP.LIST_USER_GROUP,
        api: restAPI.get,
        payload
    };
}

export function deleteUserGroup(id) {
    let payload = {
        types: [ActionTypes.DELETE_USER_GROUP_REQUEST, ActionTypes.DELETE_USER_GROUP_SUCCESS, ActionTypes.DELETE_USER_GROUP_FAILED]
    };
    return {
        url: URL.USER_GROUP.DELETE_USER_GROUP.replace(':id', id),
        api: restAPI.del,
        payload
    };
}

export function getUserGroupByID(id) {
    let payload = {
        types: [ActionTypes.GET_USER_GROUP_BY_ID_REQUEST, ActionTypes.GET_USER_GROUP_BY_ID_SUCCESS, ActionTypes.GET_USER_GROUP_BY_ID_FAILED]
    };
    return {
        url: URL.USER_GROUP.GET_USER_GROUP_BY_ID.replace(':id', id),
        api: restAPI.get,
        payload
    };
}

export function fetchUsersByUserGroup(userGroupId) {
    let payload = {
        types: [ActionTypes.FETCH_USERS_BY_USER_GROUP_REQUEST, ActionTypes.FETCH_USERS_BY_USER_GROUP_SUCCESS, ActionTypes.FETCH_USERS_BY_USER_GROUP_FAILURE]
    };
    return {
        url: URL.USER_GROUP.FETCH_USERS_BY_USER_GROUP.replace(':userGroupId', userGroupId),
        api: restAPI.get,
        payload
    };
}

export function updateUsersInGUserGroup({ userGroupId, requestBody }) {
    let payload = {
        types: [ActionTypes.UPDATE_USERS_IN_USER_GROUP_REQUEST, ActionTypes.UPDATE_USERS_IN_USER_GROUP_SUCCESS, ActionTypes.UPDATE_USERS_IN_USER_GROUP_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_GROUP.UPDATE_USERS_BY_USER_GROUP.replace(':userGroupId', userGroupId),
        api: restAPI.put,
        payload
    };
}

export function listAllNames(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_ALL_NAMES_FOR_USER_GROUP_REQUEST, ActionTypes.LIST_ALL_NAMES_FOR_USER_GROUP_SUCCESS, ActionTypes.LIST_ALL_NAMES_FOR_USER_GROUP_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_GROUP.LIST_ALL_NAMES,
        api: restAPI.get,
        payload
    };
}

export function listJsonDataForUserGroup({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_USER_GROUP_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_USER_GROUP_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_USER_GROUP_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_GROUP.LIST_ALL_NAMES,
        api: restAPI.get,
        payload
    };
}
export function listDescription(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_DESCRIPTION_REQUEST, ActionTypes.LIST_DESCRIPTION_SUCCESS, ActionTypes.LIST_DESCRIPTION_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_GROUP.LIST_ALL_NAMES,
        api: restAPI.get,
        payload
    };
}

export function fetchAssignUserForUserGroup({ params, userId }) {
    let payload = {
        types: [ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_REQUEST, ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS, ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_FAILURE],
        params: params
    };
    return {
        url: URL.USER_GROUP.FETCH_ASSIGN_USERS.replace(':userGroupId', userId),
        api: restAPI.get,
        payload
    };
}

export function submitUsersUnderUserGrp({ userId, requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_REQUEST, ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS, ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_GROUP.FETCH_ASSIGN_USERS.replace(':userGroupId', userId),
        api: restAPI.put,
        payload
    };
}

import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function authenticate(data) {
    let { username, password } = data;
    let payload = {
        body: {
            // API Parameter format
            // eslint-disable-next-line camelcase
            grant_type: 'password',
            // API Parameter format
            // eslint-disable-next-line camelcase
            client_id: 'web-app',
            scope: 'profile',
            username, password
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        types: [ActionTypes.AUTH_USER_REQUEST, ActionTypes.AUTH_USER_SUCCESS, ActionTypes.AUTH_USER_FAILED]
    };
    return {
        url: URL.USER.AUTHENTICATE,
        api: restAPI.post,
        payload
    };
}

export function getUserInfo() {
    let payload = {
        types: [ActionTypes.FETCH_USER_INFO_REQUEST, ActionTypes.FETCH_USER_INFO_SUCCESS, ActionTypes.FETCH_USER_INFO_FAILED]
    };
    return {
        url: URL.USER.FETCH_USER_INFO,
        api: restAPI.get,
        payload
    };
}

export function getUserProfile() {
    let payload = {
        types: [ActionTypes.FETCH_USER_PROFILE_REQUEST, ActionTypes.FETCH_USER_PROFILE_SUCCESS, ActionTypes.FETCH_USER_PROFILE_FAILURE]
    };
    return {
        url: URL.USER.FETCH_USER_INFO,
        api: restAPI.get,
        payload
    };
}

export function sentUserProfile(userId, data) {

    let payload = {
        types: [ActionTypes.SEND_USER_PROFILE_REQUEST, ActionTypes.SEND_USER_PROFILE_SUCCESS, ActionTypes.SEND_USER_PROFILE_FAILURE],
        body: data
    };
    return {
        url: URL.USER.SENT_USER_INFO.replace(':userId', userId),
        api: restAPI.put,
        payload
    };
}

export function changePassword(data) {
    let payload = {
        types: [ActionTypes.CHANGE_USER_PASSWORD_REQUEST, ActionTypes.CHANGE_USER_PASSWORD_SUCCESS, ActionTypes.CHANGE_USER_PASSWORD_FAILURE],
        body: data
    };
    return {
        url: URL.USER.CHANGE_PASSWORD,
        api: restAPI.put,
        payload
    };
}
export function loadOrganizations() {
    let payload = {
        types: [
            ActionTypes.LOAD_ORGANIZATIONS_REQUEST,
            ActionTypes.LOAD_ORGANIZATIONS_SUCCESS,
            ActionTypes.LOAD_ORGANIZATIONS_FAILED
        ],
        params: { type: 'dropdown' }
    };
    return {
        url: URL.ORGANIZATION.PARENT_ORGANIZATIONS,
        api: restAPI.get,
        payload
    };
}


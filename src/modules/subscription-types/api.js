import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchSubscriptionTypeDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_REQUEST, ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_SUCCESS, ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.LIST_SUBSCRIPTION_TYPE,
        api: restAPI.get,
        payload
    };
}
export function saveSubscriptionType(data) {
    let payload = {
        types: [ActionTypes.SAVE_SUBSCRIPTION_TYPE_DETAILS_REQUEST, ActionTypes.SAVE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS, ActionTypes.SAVE_SUBSCRIPTION_TYPE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.SAVE_SUBSCRIPTION_TYPE,
        api: restAPI.post,
        payload
    };
}
export function deleteSubscriptionType(data) {
    let payload = {
        types: [ActionTypes.DELETE_SUBSCRIPTION_TYPE_DETAILS_REQUEST, ActionTypes.DELETE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS, ActionTypes.DELETE_SUBSCRIPTION_TYPE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.DELETE_SUBSCRIPTION_TYPE.replace(':id', data),
        api: restAPI.del,
        payload
    };
}
export function updateSubscriptionType(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_SUBSCRIPTION_TYPE_DETAILS_REQUEST, ActionTypes.UPDATE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS, ActionTypes.UPDATE_SUBSCRIPTION_TYPE_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.UPDATE_SUBSCRIPTION_TYPE.replace(':id', id),
        api: restAPI.put,
        payload
    };
}
export function fetchSubscriptionTypeById({ langId, id }) {
    let payload = {
        types: [ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.FETCH_SUBSCRIPTION_TYPE_BY_ID.replace(':id', id),
        api: restAPI.get,
        payload
    };
}


export function listOrganizationRole({ params, types, id, full }) {
    let payload = {
        types: full ? types : [ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_REQUEST,
        ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_SUCCESS, ActionTypes.LIST_SUBSCRIPTION_TOPIC_ROLE_FAILURE],
        params
    };
    let url = full ? URL.ROLE.ADD_ROLE : URL.SUBSCRIPTION_TYPE.ASSIGN_ROLE_TO_TOPIC.replace(':id', id);
    return {
        url,
        api: restAPI.get,
        payload
    };
}

export function submitAssignRole({ requestBody, subscriptionTopicId }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_REQUEST, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_FAILURE],
        body: requestBody
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.ASSIGN_ROLE_TO_TOPIC.replace(':id', subscriptionTopicId),
        api: restAPI.put,
        payload
    };
}

export function listUserGroups({ params, types, id, full }) {
    let payload = {
        types: full ? types : [ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_REQUEST,
        ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_SUCCESS, ActionTypes.LIST_SUBSCRIPTION_TOPIC_USER_GROUP_FAILURE],
        params
    };
    let url = full ? URL.USER_GROUP.LIST_USER_GROUP : URL.SUBSCRIPTION_TYPE.ASSIGN_USER_GROUP_TO_TOPIC.replace(':id', id);
    return {
        url,
        api: restAPI.get,
        payload
    };
}

export function submitUserGroup({ requestBody, subscriptionTopicId }) {
    let payload = {
        types: [ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_REQUEST, ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_SUCCESS, ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_FAILURE],
        body: requestBody
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.ASSIGN_USER_GROUP_TO_TOPIC.replace(':id', subscriptionTopicId),
        api: restAPI.put,
        payload
    };
}

export function listHomePosts({ params, id }) {
    let payload = {
        types: [ActionTypes.LIST_HOME_POSTS_REQUEST, ActionTypes.LIST_HOME_POSTS_SUCCESS, ActionTypes.LIST_HOME_POSTS_FAILURE],
        params
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.LIST_HOME_POSTS.replace(':id', id),
        api: restAPI.get,
        payload
    };
}

export function saveHomePost({ id, formData }) {
    let payload = {
        types: [ActionTypes.SAVE_HOME_POST_DETAILS_REQUEST, ActionTypes.SAVE_HOME_POST_DETAILS_SUCCESS, ActionTypes.SAVE_HOME_POST_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.SAVE_HOME_POST.replace(':id', id),
        api: restAPI.postformData,
        payload
    };
}
export function deleteHomePost({ id, postId }) {
    let payload = {
        types: [ActionTypes.DELETE_HOME_POST_DETAILS_REQUEST, ActionTypes.DELETE_HOME_POST_DETAILS_SUCCESS, ActionTypes.DELETE_HOME_POST_DETAILS_FAILURE]
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.DELETE_HOME_POST.replace(':id', id).replace(':postId', postId),
        api: restAPI.del,
        payload
    };
}
export function updateHomePost({ formData, id, postId }) {
    let payload = {
        types: [ActionTypes.UPDATE_HOME_POST_DETAILS_REQUEST, ActionTypes.UPDATE_HOME_POST_DETAILS_SUCCESS, ActionTypes.UPDATE_HOME_POST_DETAILS_FAILURE],
        body: formData
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.UPDATE_HOME_POST.replace(':id', id).replace(':postId', postId),
        api: restAPI.putformData,
        payload
    };
}
export function fetchHomePostById({ langId, id, postId }) {
    let payload = {
        types: [ActionTypes.FETCH_HOME_POST_BY_ID_REQUEST, ActionTypes.FETCH_HOME_POST_BY_ID_SUCCESS, ActionTypes.FETCH_HOME_POST_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.SUBSCRIPTION_TYPE.FETCH_HOME_POST_BY_ID.replace(':id', id).replace(':postId', postId),
        api: restAPI.get,
        payload
    };
}

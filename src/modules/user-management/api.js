import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';


export function listUser({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_USER,
        api: restAPI.get,
        payload
    };
}
export function addUser(data) {
    let payload = {
        types: [ActionTypes.ADD_USER_REQUEST, ActionTypes.ADD_USER_SUCCESS, ActionTypes.ADD_USER_FAILURE],
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.ADD_USER,
        api: restAPI.post,
        payload
    };
}

//to get user byid
export function getUserById(data) {
    let payload = {
        types: [ActionTypes.GET_USER_BY_ID_REQUEST, ActionTypes.GET_USER_BY_ID_SUCCESS, ActionTypes.GET_USER_BY_ID_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_USER_BY_ID.replace(':userId', data),
        api: restAPI.get,
        payload
    };
}

export function updateUser(id, data) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_REQUEST, ActionTypes.UPDATE_USER_SUCCESS, ActionTypes.UPDATE_USER_FAILURE],
        params: id,
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER,
        api: restAPI.put,
        payload
    };
}

export function updateUserOrganization(id, data) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_ORGANISATION_REQUEST, ActionTypes.UPDATE_USER_ORGANISATION_SUCCESS, ActionTypes.UPDATE_USER_ORGANISATION_FAILURE],
        params: id,
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER,
        api: restAPI.put,
        payload
    };
}

export function updateUserRoles(id, data) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_ROLES_REQUEST, ActionTypes.UPDATE_USER_ROLES_SUCCESS, ActionTypes.UPDATE_USER_ROLES_FAILURE],
        params: id,
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER,
        api: restAPI.put,
        payload
    };
}

export function updateUserPassword({ userId, data }) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_PASSWORD_REQUEST, ActionTypes.UPDATE_USER_PASSWORD_SUCCESS, ActionTypes.UPDATE_USER_PASSWORD_FAILURE],
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER_PASSWORD.replace(':userId', userId),
        api: restAPI.put,
        payload
    };
}
export function searchUser(data) {
    let payload = {
        types: [ActionTypes.SEARCH_USER_REQUEST, ActionTypes.SEARCH_USER_SUCCESS, ActionTypes.SEARCH_USER_FAILURE],
        params: data
    };
    return {
        url: URL.USER_MANAGEMENT.SEARCH_USER,
        api: restAPI.get,
        payload
    };
}
export function deleteUser(data) {
    let payload = {
        types: [ActionTypes.DELETE_USER_REQUEST, ActionTypes.DELETE_USER_SUCCESS, ActionTypes.DELETE_USER_FAILURE],
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.DELETE_USER.replace(':id', data),
        api: restAPI.del,
        payload
    };
}

export function listCountryCode() {
    let payload = {
        types: [ActionTypes.LIST_COUNTRY_CODE_REQUEST, ActionTypes.LIST_COUNTRY_CODE_SUCCESS, ActionTypes.LIST_COUNTRY_CODE_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_COUNTRY_CODE,
        api: restAPI.get,
        payload
    };
}

export function addMultipleOrganisations() {
    let payload = {
        types: [ActionTypes.LIST_COUNTRY_CODE_REQUEST, ActionTypes.LIST_COUNTRY_CODE_SUCCESS, ActionTypes.LIST_COUNTRY_CODE_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_COUNTRY_CODE,
        api: restAPI.get,
        payload
    };
}

export function getAddressOfUser(data) {
    let payload = {
        types: [ActionTypes.GET_ADDRESS_OF_USER_REQUEST, ActionTypes.GET_ADDRESS_OF_USER_SUCCESS, ActionTypes.GET_ADDRESS_OF_USER_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_USER.replace(':userId', data.id),
        api: restAPI.get,
        payload
    };
}

export function updateUserAddress(data) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_ADDRESS_REQUEST, ActionTypes.UPDATE_USER_ADDRESS_SUCCESS, ActionTypes.UPDATE_USER_ADDRESS_FAILURE],
        body: data.data
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER_ADDRESS.replace(':userId', data.id),
        api: restAPI.put,
        payload
    };
}

export function loadOrganisatiionWithUserId(data) {
    let payload = {
        types: [ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_REQUEST, ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_SUCCESS, ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.LOAD_ORGANISATION_FOR_USERS.replace(':userId', data),
        api: restAPI.get,
        payload
    };
}

export function editOrganisatiionWithUserId({ id, requestBody }, defaultOrganizationId) {
    let payload = {
        types: [ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_REQUEST, ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_SUCCESS, ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.EDIT_ORGANISATION_FOR_USERS.replace(':userId', id).replace(':defaultOrganizationId', defaultOrganizationId),
        api: restAPI.put,
        payload
    };
}
export function loadRoleWithUserId(data) {
    let payload = {
        types: [ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_REQUEST, ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_SUCCESS, ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID_FAILURE],
        body: data.data
    };
    return {
        url: URL.USER_MANAGEMENT.LOAD_ROLE_FOR_USERS.replace(':userId', data),
        api: restAPI.get,
        payload
    };
}

export function editRoleWithUserId({ id, requestBody }) {
    let payload = {
        types: [ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_REQUEST, ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_SUCCESS, ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.EDIT_ROLE_FOR_USERS.replace(':userId', id),
        api: restAPI.put,
        payload
    };
}

export function loadUserGroupwithUserId(data) {
    let payload = {
        types: [ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_REQUEST, ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_SUCCESS, ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID_FAILURE],
        body: data.data
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_USER_GROUP_FOR_USERS.replace(':userId', data),
        api: restAPI.get,
        payload
    };
}

export function updateUserGroupwithUserIds({ id, requestBody }) {
    let payload = {
        types: [ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_REQUEST, ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_SUCCESS, ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_USER_GROUP_FOR_USERS.replace(':userId', id),
        api: restAPI.put,
        payload
    };
}

export function editUserBasicDetail({ id, data }) {
    let payload = {
        types: [ActionTypes.EDIT_USER_BASIC_DETAILS_REQUEST, ActionTypes.EDIT_USER_BASIC_DETAILS_SUCCESS, ActionTypes.EDIT_USER_BASIC_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.USER_MANAGEMENT.EDIT_USER_BASIC_DETAILS.replace(':userId', id),
        api: restAPI.put,
        payload
    };
}

export function getContactDetails(id) {
    let payload = {
        types: [ActionTypes.GET_CONTACT_DETAILS_REQUEST, ActionTypes.GET_CONTACT_DETAILS_SUCCESS, ActionTypes.GET_CONTACT_DETAILS_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_USER_CONTACT_DETAILS.replace(':userId', id),
        api: restAPI.get,
        payload
    };
}

export function editContactDetails(data) {
    let payload = {
        types: [ActionTypes.EDIT_USER_CONTACT_REQUEST, ActionTypes.EDIT_USER_CONTACT_SUCCESS, ActionTypes.EDIT_USER_CONTACT_FAILURE],
        body: data.data
    };
    return {
        url: URL.USER_MANAGEMENT.EDIT_USER_CONTACT_DETAILS.replace(':userId', data.id),
        api: restAPI.put,
        payload
    };
}
export function getUserType() {
    let payload = {
        types: [ActionTypes.GET_USER_TYPE_REQUEST, ActionTypes.GET_USER_TYPE_SUCCESS, ActionTypes.GET_USER_TYPE_FAILURE]
    };
    return {
        url: URL.USER_MANAGEMENT.GET_USER_TYPE,
        api: restAPI.get,
        payload
    };
}

export function listJsonDataForRegRole({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_USER_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_USER_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_USER_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}


export function listLastNane(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_LAST_NAME_REQUEST, ActionTypes.LIST_LAST_NAME_SUCCESS, ActionTypes.LIST_LAST_NAME_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}
export function listfirstName(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_FIRST_NAME_REQUEST, ActionTypes.LIST_FIRST_NAME_SUCCESS, ActionTypes.LIST_FIRST_NAME_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}

export function listEmail(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_EMAIL_REQUEST, ActionTypes.LIST_EMAIL_SUCCESS, ActionTypes.LIST_EMAIL_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}

export function listMobile(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_MOBILE_REQUEST, ActionTypes.LIST_MOBILE_SUCCESS, ActionTypes.LIST_MOBILE_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}

export function listRole(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_ROLE_REQUEST, ActionTypes.LIST_ROLE_SUCCESS, ActionTypes.LIST_ROLE_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}

export function listOrg(type, searchValue, searchKey) {
    let payload = {
        types: [ActionTypes.LIST_ORG_REQUEST, ActionTypes.LIST_ORG_SUCCESS, ActionTypes.LIST_ORG_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_ALL_USER_NAME,
        api: restAPI.get,
        payload
    };
}

export function fetchAssignOrganizationForUser({ params, userId }) {
    let payload = {
        types: [ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_REQUEST, ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_SUCCESS, ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_FAILURE],
        params
    };
    return {
        url: URL.USER_MANAGEMENT.FETCH_ASSIGN_ORGANIZATION.replace(':userId', userId),
        api: restAPI.get,
        payload
    };
}

export function fetchAssignRoleForUser({ params, userId }) {
    let payload = {
        types: [ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_REQUEST, ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_FAILURE],
        params
    };
    return {
        url: URL.USER_MANAGEMENT.FETCH_ASSIGN_ROLES.replace(':userId', userId),
        api: restAPI.get,
        payload
    };
}

export function fetchAssignUserGroupForUser({ params, userId }) {
    let payload = {
        types: [ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_REQUEST, ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_FAILURE],
        params
    };
    return {
        url: URL.USER_MANAGEMENT.FETCH_ASSIGN_USER_GROUP.replace(':userId', userId),
        api: restAPI.get,
        payload
    };
}

export function updateAssignOrganizationMapping({ userId, defaultOrganizationId, requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_REQUEST, ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_ASSIGN_ORGANIZATION.replace(':userId', userId).replace(':defaultOrgId', defaultOrganizationId),
        api: restAPI.put,
        payload
    };
}

export function updateAssignRoleMapping({ userId, requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_REQUEST, ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.UPDATE_ASSIGN_ROLES.replace(':userId', userId),
        api: restAPI.put,
        payload
    };
}

export function updateAssignUserGroupMapping({ userId, requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_REQUEST, ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_FAILURE],
        body: requestBody
    };
    return {
        url: URL.USER_MANAGEMENT.FETCH_ASSIGN_USER_GROUP.replace(':userId', userId),
        api: restAPI.put,
        payload
    };
}

export function loadStates() {
    let payload = {
        types: [
            ActionTypes.LOAD_STATE_REQUEST,
            ActionTypes.LOAD_STATE_SUCCESS,
            ActionTypes.LOAD_STATE_FAILURE
        ],
        params: { type: 'dropdown' }
    };
    return {
        url: URL.ORGANIZATION.LOAD_STATES,
        api: restAPI.get,
        payload
    };
}

export function loadDistricts({ stateId }) {
    let payload = {
        types: [
            ActionTypes.LIST_DISTRICTS_FOR_ADDRESS_REQUEST,
            ActionTypes.LIST_DISTRICTS_FOR_ADDRESS_SUCCESS,
            ActionTypes.LIST_DISTRICTS_FOR_ADDRESS_FAILURE
        ],
        params: { stateId, type: 'dropdown' }

    };
    return {
        url: URL.ORGANIZATION.LOAD_DISTRICTS,
        api: restAPI.get,
        payload
    };
}
export function loadGender({ params }) {
    let payload = {
        types: [
            ActionTypes.LIST_GENDER_REQUEST,
            ActionTypes.LIST_GENDER_SUCCESS,
            ActionTypes.LIST_GENDER_FAILURE
        ],
        params: { ...params, type: 'dropdown' }
    };
    return {
        url: URL.USER_MANAGEMENT.LIST_GENDER,
        api: restAPI.get,
        payload
    };
}

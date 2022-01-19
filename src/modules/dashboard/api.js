import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
import { STATE_VALUE } from '../common/constants';


export function loadLSGITypes() {
    let payload = {
        types: [
            ActionTypes.LOAD_LSGI_TYPE_REQUEST,
            ActionTypes.LOAD_LSGI_TYPE_SUCCESS,
            ActionTypes.LOAD_LSGI_TYPE_FAILURE
        ],
        params: { type: 'dropdown' }
    };
    return {
        url: URL.ORGANIZATION.LOAD_LSGI_TYPES,
        api: restAPI.get,
        payload
    };
}
export function loadLSGI(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_LSGI_REQUEST,
            ActionTypes.LOAD_LSGI_SUCCESS,
            ActionTypes.LOAD_LSGI_FAILURE
        ],
        params: { type: 'dropdown', lsgiTypeId: data.lsgiId, districtId: data.districtId }
    };
    return {
        url: URL.ORGANIZATION.LOAD_LSGI,
        api: restAPI.get,
        payload
    };
}

export function loadDistricts() {
    let payload = {
        types: [
            ActionTypes.LOAD_DISTRICT_REQUEST,
            ActionTypes.LOAD_DISTRICT_SUCCESS,
            ActionTypes.LOAD_DISTRICT_FAILURE
        ],
        params: { type: 'dropdown', stateId: STATE_VALUE.id }

    };
    return {
        url: URL.ORGANIZATION.LOAD_DISTRICTS,
        api: restAPI.get,
        payload
    };
}
//
export function loadChildCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_CHILD_COUNT_REQUEST,
            ActionTypes.LOAD_TOTAL_CHILD_COUNT_SUCCESS,
            ActionTypes.LOAD_TOTAL_CHILD_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }

    };
    return {
        url: URL.DASHBOARD.CHILD_COUNT,
        api: restAPI.get,
        payload
    };
}
export function loadParentCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_PARENT_COUNT_REQUEST,
            ActionTypes.LOAD_TOTAL_PARENT_COUNT_SUCCESS,
            ActionTypes.LOAD_TOTAL_PARENT_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }

    };
    return {
        url: URL.DASHBOARD.PARENT_COUNT,
        api: restAPI.get,
        payload
    };
}

export function loadComplaintCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_COMPLAINT_RECEIVED_COUNT_REQUEST,
            ActionTypes.LOAD_TOTAL_COMPLAINT_RECEIVED_COUNT_SUCCESS,
            ActionTypes.LOAD_TOTAL_COMPLAINT_RECEIVED_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }

    };
    return {
        url: URL.DASHBOARD.COMPLAINT_COUNT,
        api: restAPI.get,
        payload
    };
}
export function loadGeneralPublicCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_GENERAL_PUBLIC_COUNT_REQUEST,
            ActionTypes.LOAD_TOTAL_GENERAL_PUBLIC_COUNT_SUCCESS,
            ActionTypes.LOAD_TOTAL_GENERAL_PUBLIC_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }
    };
    return {
        url: URL.DASHBOARD.GENERAL_PUBLIC,
        api: restAPI.get,
        payload
    };
}
export function loadOfficialCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_OFFICIALS_COUNT_REQUEST,
            ActionTypes.LOAD_TOTAL_OFFICIALS_COUNT_SUCCESS,
            ActionTypes.LOAD_TOTAL_OFFICIALS_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }

    };
    return {
        url: URL.DASHBOARD.OFFICIAL_COUNT,
        api: restAPI.get,
        payload
    };
}
export function loadTotalTeacherCount(data) {
    let payload = {
        types: [
            ActionTypes.LOAD_TOTAL_TEACHERS_COUNT_REQUEST, ActionTypes.LOAD_TOTAL_TEACHERS_COUNT_SUCCESS, ActionTypes.LOAD_TOTAL_TEACHERS_COUNT_FAILURE
        ],
        params: { lsgiId: data.lsgiId, districtId: data.districtId }

    };
    return {
        url: URL.DASHBOARD.TEACHERS_COUNT,
        api: restAPI.get,
        payload
    };
}


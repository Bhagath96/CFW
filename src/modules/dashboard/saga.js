import { all, call, takeLatest } from 'redux-saga/effects';
import * as API from './api';
import { saga } from '../../common';

import { types as ActionTypes } from './actions';

function* loadDistricts() {
    yield call(saga.handleAPIRequest, API.loadDistricts);
}
function* loadLSGIType() {
    yield call(saga.handleAPIRequest, API.loadLSGITypes);
}
function* loadLSGI(action) {
    const params = action.payload;
    yield call(saga.handleAPIRequest, API.loadLSGI, params);
}
//
function* loadChildCount(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadChildCount, params);
}
function* loadParentCount(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadParentCount, params);
}
function* loadTeachersCount(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadTotalTeacherCount, params);
}
function* loadGeneralPublic(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadGeneralPublicCount, params);
}
function* loadOfficialCount(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadOfficialCount, params);
}
function* loadComplaintCount(action) {
    const params = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadComplaintCount, params);
}


export default function* dashboardSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_DISTRICT, loadDistricts),
        takeLatest(ActionTypes.LOAD_LSGI_TYPE, loadLSGIType),
        takeLatest(ActionTypes.LOAD_LSGI, loadLSGI),

        takeLatest(ActionTypes.LOAD_TOTAL_CHILD_COUNT, loadChildCount),
        takeLatest(ActionTypes.LOAD_TOTAL_PARENT_COUNT, loadParentCount),
        takeLatest(ActionTypes.LOAD_TOTAL_TEACHERS_COUNT, loadTeachersCount),
        takeLatest(ActionTypes.LOAD_TOTAL_GENERAL_PUBLIC_COUNT, loadGeneralPublic),
        takeLatest(ActionTypes.LOAD_TOTAL_OFFICIALS_COUNT, loadOfficialCount),
        takeLatest(ActionTypes.LOAD_TOTAL_COMPLAINT_RECEIVED_COUNT, loadComplaintCount)

    ]);

}

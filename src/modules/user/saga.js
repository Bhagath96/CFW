import { all, take, takeLatest, call, fork, delay } from 'redux-saga/effects';
import { saga, history } from '../../common';
import { types as ActionTypes } from './actions';
import * as UserAPI from './api';
import { infoNotify, successNotify, errorNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData } from '../../utils/ApiUtils';
import { PATH } from '../../routes';

function* loadHomePage() {
    yield call(history.push, '/admin/index');
}
function* authenticate(action) {
    yield call(infoNotify, 'Signing in..', 0);
    yield fork(saga.handleAPIRequest, UserAPI.authenticate, action.payload.data);
    yield take(ActionTypes.AUTH_USER_SUCCESS);
    yield fork(saga.handleAPIRequest, UserAPI.getUserInfo);
    yield take(ActionTypes.FETCH_USER_INFO_SUCCESS);
    yield call(successNotify, 'Login success. Redirecting..');
    // yield delay(1200);
    yield call(loadHomePage);
}

function* fetchUserProfile() {
    yield call(saga.handleAPIRequest, UserAPI.getUserProfile);
}

function* sendUserProfile(action) {
    yield fork(saga.handleAPIRequest, UserAPI.sentUserProfile, action.payload.userId, action.payload.data);
    yield take(ActionTypes.SEND_USER_PROFILE_SUCCESS);
    yield call(successNotify, 'User Profile updated successfully.');
}

function* changeUserProfilePassword(action) {
    yield fork(saga.handleAPIRequest, UserAPI.changePassword, action.payload.data);
    yield take(ActionTypes.CHANGE_USER_PASSWORD_SUCCESS);
    yield call(successNotify, 'User Password Changed successfully.');
}
function* loadOrganizations() {
    yield fork(saga.handleAPIRequest, UserAPI.loadOrganizations);
    const responseAction = yield take(ActionTypes.LOAD_ORGANIZATIONS_SUCCESS);
    const response = getPayloadData(responseAction.payload, []);
    if (Array.isArray(response) && response.length === 0) {
        yield call(infoNotify, 'organization_not_available');
        yield delay(200);
        yield call(history.push, `${PATH.ORGANIZATION}/create`);
    }
}

function* handleAuthenticationFailure(action) {
    let message = action.payload.error ? action.payload.error.message : 'Technical error.';
    yield call(errorNotify, message);
}
export default function* userSaga() {
    yield all([
        takeLatest(ActionTypes.REDIRECT_TO_HOME, loadHomePage),
        takeLatest(ActionTypes.AUTH_USER, authenticate),
        takeLatest(ActionTypes.FETCH_USER_PROFILE, fetchUserProfile),
        takeLatest(ActionTypes.SEND_USER_PROFILE, sendUserProfile),
        takeLatest(ActionTypes.CHANGE_USER_PASSWORD, changeUserProfilePassword),
        takeLatest(ActionTypes.LOAD_ORGANIZATIONS, loadOrganizations),
        takeLatest([ActionTypes.AUTH_USER_FAILED, ActionTypes.FETCH_USER_INFO_FAILED, ActionTypes.SEND_USER_PROFILE_FAILURE, ActionTypes.CHANGE_USER_PASSWORD_FAILURE], handleAuthenticationFailure)
    ]);
}

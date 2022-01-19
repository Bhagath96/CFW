import { takeLatest, all, call, fork, take, delay } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga } from '../../common';
import * as API from './api';
import { errorNotify, successNotify } from '../../utils/ReactReduxNotifyUtils';

function* sentMobileNumber(action) {
    yield fork(saga.handleAPIRequest, API.sentMobileNumberForOtp, action.payload.mobile);
}
function* sentOtp(action) {
    yield fork(saga.handleAPIRequest, API.sentOtpForVerification, action.payload.otp, action.payload.mobile);
}

function* resetPassword(action) {
    let { payload: { password = '', mobile = '', requestId = '' } = {} } = action;

    yield fork(saga.handleAPIRequest, API.resetPasswordForUser, { password, mobile, requestId });
    yield take(ActionTypes.RESET_PASSWORD_SUCCESS);
    yield call(successNotify, 'Password changed successfully.');
    yield delay(500);
    window.location.hash = '/';
}
function* showErrorNotification(action) {
    let message = action.payload.error ? action.payload.error.message : 'Technical error.';
    yield call(errorNotify, message, 3000);
}

export default function* forgotPasswordSaga() {
    yield all([
        takeLatest(ActionTypes.SENT_MOBILE_NUMBER, sentMobileNumber),
        takeLatest(ActionTypes.SENT_OTP, sentOtp),
        takeLatest(ActionTypes.RESET_PASSWORD, resetPassword),
        //All Error Notifications for Organization(API) handled here
        takeLatest([ActionTypes.SENT_MOBILE_NUMBER_FAILURE, ActionTypes.SENT_OTP_FAILURE, ActionTypes.RESET_PASSWORD_FAILURE], showErrorNotification)
    ]);
}

import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function sentMobileNumberForOtp(mobile) {
    let payload = {
        types: [ActionTypes.SENT_MOBILE_NUMBER_REQUEST, ActionTypes.SENT_MOBILE_NUMBER_SUCCESS, ActionTypes.SENT_MOBILE_NUMBER_FAILURE],
        params: { mobile }
    };
    return {
        url: URL.FORGOT_PASSWORD.SENT_MOBILE_NUMBER_FOR_OTP,
        api: restAPI.get,
        payload
    };
}

export function sentOtpForVerification(otp, mobile) {
    let payload = {
        types: [ActionTypes.SENT_OTP_REQUEST, ActionTypes.SENT_OTP_SUCCESS, ActionTypes.SENT_OTP_FAILURE],
        params: { otp, mobile }
    };
    return {
        url: URL.FORGOT_PASSWORD.OPT_VERIFY,
        api: restAPI.get,
        payload
    };
}

export function resetPasswordForUser(data) {
    let payload = {
        types: [ActionTypes.RESET_PASSWORD_REQUEST, ActionTypes.RESET_PASSWORD_SUCCESS, ActionTypes.RESET_PASSWORD_FAILURE],
        body: data
    };
    return {
        url: URL.FORGOT_PASSWORD.RESET_PASSWORD,
        api: restAPI.put,
        payload
    };
}

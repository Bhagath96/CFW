import { action } from '../../common';

export const types = {
    SENT_MOBILE_NUMBER: 'SENT_MOBILE_NUMBER',
    SENT_MOBILE_NUMBER_SUCCESS: 'SENT_MOBILE_NUMBER_SUCCESS',
    SENT_MOBILE_NUMBER_REQUEST: 'SENT_MOBILE_NUMBER_REQUEST',
    SENT_MOBILE_NUMBER_FAILURE: 'SENT_MOBILE_NUMBER_FAILURE',

    SENT_OTP: 'SENT_OTP',
    SENT_OTP_REQUEST: 'SENT_OTP_REQUEST',
    SENT_OTP_SUCCESS: 'SENT_OTP_SUCCESS',
    SENT_OTP_FAILURE: 'SENT_OTP_FAILURE',

    RESET_PASSWORD: 'RESET_PASSWORD',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'

};

export const sentMobileNumber = (mobile) => action(types.SENT_MOBILE_NUMBER, { mobile });

export const sentOtp = (otp, mobile) => action(types.SENT_OTP, { otp, mobile });

export const resetPassword = (password, mobile, requestId) => action(types.RESET_PASSWORD, { password, mobile, requestId });

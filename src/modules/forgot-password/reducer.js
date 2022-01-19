import { types as ActionTypes } from './actions';

const initialState = {
    forgotPassword: {
        requestInProgress: false,
        otpSentSuccessfully: false,
        error: {},
        gotToNextPage: false,
        mobile: ''
    },
    otp: {
        requestInProgress: false,
        otPverified: false,
        error: {},
        gotoLastPage: false
    },
    mobileVerification: {
        mobile: '',
        requestId: ''
    },
    resetPassword: {
        requestInProgress: false,
        passwordReset: false
    },
    timeValue: 120000


};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SENT_MOBILE_NUMBER_REQUEST:
            return Object.assign({}, state, {
                forgotPassword: {
                    ...state.forgotPassword,
                    requestInProgress: true,
                    otpSentSuccessfully: false,
                    gotToNextPage: false
                }
            });

        case ActionTypes.SENT_MOBILE_NUMBER_SUCCESS:
            return Object.assign({}, state, {
                forgotPassword: {
                    ...state.forgotPassword,
                    requestInProgress: false,
                    otpSentSuccessfully: true,
                    gotToNextPage: true,
                    error: {}
                }
            });

        case ActionTypes.SENT_MOBILE_NUMBER_FAILURE:
            return Object.assign({}, state, {
                forgotPassword: {
                    ...state.forgotPassword,
                    requestInProgress: false,
                    otpSentSuccessfully: false,
                    gotToNextPage: false,
                    error: 'an error has been occurred'
                }
            });
        case ActionTypes.SENT_MOBILE_NUMBER:
            return Object.assign({}, state, {
                mobileVerification: {
                    ...state.mobileVerification,
                    mobile: action.payload.mobile
                }
            });

        case ActionTypes.SENT_OTP_REQUEST:
            return Object.assign({}, state, {
                otp: {
                    requestInProgress: true,
                    otPverified: false,
                    gotoLastPage: false,
                    error: {}
                }
            });

        case ActionTypes.SENT_OTP_SUCCESS:
            return Object.assign({}, state, {
                otp: {
                    requestInProgress: true,
                    otPverified: true,
                    gotoLastPage: true,
                    error: {}
                },
                mobileVerification: {
                    ...state.mobileVerification,
                    requestId: action.payload.data.data
                }

            });

        case ActionTypes.SENT_OTP_FAILURE:
            return Object.assign({}, state, {
                otp: {
                    requestInProgress: false,
                    otPverified: false,
                    gotoLastPage: false,
                    error: 'an error has been occurred while accessing otp'
                }
            });

        case ActionTypes.RESET_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                resetPassword: {
                    requestInProgress: true,
                    passwordReset: false
                }
            });

        case ActionTypes.RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                resetPassword: {
                    requestInProgress: false,
                    passwordReset: true
                },
                mobileVerification: { ...initialState.mobileVerification },
                otp: { ...initialState.otp },
                forgotPassword: { ...initialState.otp }
            });

        case ActionTypes.RESET_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                resetPassword: {
                    requestInProgress: false,
                    passwordReset: false
                }
            });

        default:
            return state;
    }
};
export default reducer;


import React, { useState } from 'react';
import { Components, I18n } from '../../../common/components';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField } from '../../../utils/FormUtils';
import { STATE_REDUCER_KEY, OPT_TIMER } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { sentOtp, sentMobileNumber } from '../actions';

const { Grid, Button } = Components;

const validate = (values) => {
    const errors = {};
    if (!values.otp) {
        errors.otp = I18n.t('otp_required');
    } else if (values.otp.length > 5) {
        errors.otp = I18n.t('invalid_otp');
    } else if (isNaN(Number(values.otp))) {
        errors.otp = I18n.t('must_be_a_number');
    }
    return errors;
};


// Destructuring props
const SecondStep = ({
    handleNext,
    handleSubmit
}) => {
    const dispatch = useDispatch();
    const [countDownTimer, setCountDownTimer] = useState(Date.now() + OPT_TIMER);
    const forgotPassword = useSelector(state => state[STATE_REDUCER_KEY].mobileVerification);
    const { mobile } = forgotPassword;
    const otpVerification = useSelector(state => state[STATE_REDUCER_KEY].otp);
    const { gotoLastPage } = otpVerification;
    if (gotoLastPage === true) {
        handleNext();
    }


    const resendOtp = () => {
        setCountDownTimer(Date.now() + OPT_TIMER);
        dispatch(sentMobileNumber(mobile));
    };
    const renderer = ({ minutes, seconds, completed }) => {

        if (completed) {

            return <Button
                onClick={resendOtp}
                style={{ marginRight: 10 }}
            >
                {I18n.t('resend_otp')}
            </Button>;
        } else {

            return <span style={{ padding: '33px' }}>{minutes}:{seconds}</span>;

        }
    };

    const submit = (values) => {
        dispatch(sentOtp(values.otp, mobile));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>

                <Grid container>
                    {/* <Grid item xs={2}></Grid> */}
                    <Grid item >
                        <Field name='otp' label={I18n.t('enter_otp')} component={renderTextField} />
                        {/* <Grid item xs={2}></Grid> */}
                    </Grid>
                </Grid>

                <div
                    style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
                >
                    <Countdown date={countDownTimer} renderer={renderer} key={countDownTimer.toString()} />

                    <Button
                        type='submit'
                    >
                        {I18n.t('next')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

// export default SecondStep;

export default reduxForm({
    form: 'SecondStep',
    validate
})(SecondStep);

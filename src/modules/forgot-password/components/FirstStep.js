import React, { Fragment, useState, useEffect } from 'react';
import { Components, I18n } from '../../../common/components';
import { useDispatch, useSelector } from 'react-redux';
import { sentMobileNumber } from '../actions';
const { Grid, Button, TextField } = Components;
import { STATE_REDUCER_KEY } from '../constants';
import { withStyles } from '@material-ui/core';
const WhiteTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            color: 'black' // Text color
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black' // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'black' // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black' // Solid underline on focus
        },
        '& .MuiFormLabel-root': {
            color: '#a2a2a2'
        },
        '& .MuiFormLabel-root:after': {
            color: '#a2a2a2'
        }
    }
})(TextField);


const FirstStep = ({
    handleNext,
    handleChange,
    values: { mobile },
    formErrors
}) => {
    // Check if all values are not empty or if there are some error
    const isValid =
        mobile.length > 0 &&
        !formErrors.mobile;
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const forgotPassword = useSelector(state => state[STATE_REDUCER_KEY].forgotPassword);
    const { gotToNextPage } = forgotPassword;
    const [error, setError] = useState('');
    if (gotToNextPage === true) {
        handleNext();
    }
    useEffect(() => {

    }, [count]);

    const handleSubmit = () => {
        setCount(prevState => prevState + 1);
        if (mobile.length > 10) {
            setError(I18n.t('please_enter_valid_phone_number'));
        } else if (mobile.length < 10) {
            setError(I18n.t('please_enter_valid_phone_number'));

        } else {
            dispatch(sentMobileNumber(mobile));

        }

    };
    return (
        <Fragment>
            <Grid container spacing={2} noValidate>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <WhiteTextField
                        required
                        fullWidth
                        label={I18n.t('phone_number')}
                        name="mobile"
                        placeholder="i.e: xxx-xxx-xxxx"
                        value={mobile || ''}
                        onChange={handleChange}
                        error={!!formErrors.mobile}
                        helperText={formErrors.mobile}
                        margin="normal"
                        type='number'
                    />
                    {error ? <small style={{
                        color: 'red', fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'normal'
                    }}>
                        {error}</small> : null}
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} noValidate>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <div
                style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
            >
                <Button
                    variant="contained"
                    disabled={!isValid}
                    color="primary"
                    onClick={isValid ? handleSubmit : null}
                >
                    {I18n.t('generate_otp')}
                </Button>
            </div>
        </Fragment>
    );
};

export default FirstStep;

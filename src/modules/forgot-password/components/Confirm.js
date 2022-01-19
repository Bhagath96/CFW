import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Components, I18n } from '../../../common/components';
import { withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
// import { submit } from 'redux-form';
const { Grid
    // FormControl, Select, InputLabel, MenuItem
} = Components;

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
const Confirm = ({
    handleBack
    // formErrors
}) => {
    // Check if all values are not empty or if there are some error
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const mobileAndRequestId = useSelector(state => state[STATE_REDUCER_KEY].mobileVerification);
    const { mobile, requestId } = mobileAndRequestId;

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError(I18n.t('password_mismatches'));
        } else {
            dispatch(resetPassword(password, mobile, requestId));
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
                        label={I18n.t('enter_new_password')}
                        name="password"
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        type='password'
                    />
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} noValidate>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <WhiteTextField
                        required
                        fullWidth
                        label={I18n.t('confirm_new_password')}
                        name="confirmpassword"
                        value={confirmPassword || ''}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        type='password'
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
            <div
                style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
            >
                <Button
                    variant="contained"
                    color="default"
                    onClick={handleBack}
                    style={{ marginRight: 10 }}
                >
                    {I18n.t('back')}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    {I18n.t('submit')}
                </Button>
            </div>
        </Fragment>
    );
};

export default Confirm;

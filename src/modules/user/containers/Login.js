import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { redirectToHome, authenticateUser } from '../actions';
import LoginView from '../components/LoginView';
import { getUserLogin, getUserAuthData } from '../selectors';
import { useDispatch } from 'react-redux';

export const Login = (props) => {
    const { authData } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(authData).length !== 0) {
            dispatch(redirectToHome());
        }
    }, []);

    return (
        <LoginView {...props} />
    );
};

const validate = values => {
    const errors = {};
    if (!values.username || values.username.length < 1) {
        errors.username = 'Enter username';
    }
    if (!values.password || values.password.length < 1) {
        errors.password = 'Enter password';
    }
    return errors;
};

const mapStateToProps = createStructuredSelector({
    login: getUserLogin,
    authData: getUserAuthData
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (values) => {
        dispatch(authenticateUser(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'LoginForm',
    validate
})(Login));

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Actions from '../actions';
import { useDispatch } from 'react-redux';
import { PROJECT_CONFIG_PROPS } from '../../../common/constants';
import { getProjectProps } from '../../../utils/ConfigUtils';
import Colors from '../../../common/components/custom/Colors';

const PROJECT_DETAILS = getProjectProps(PROJECT_CONFIG_PROPS.DETAILS);
const { LoginLogo, CustomLogin } = getProjectProps(PROJECT_CONFIG_PROPS.COMPONENTS);

const LoginView = (props) => {
    const history = useHistory();
    const changeRoute = () => {
        history.push('/forgot-password');
    };
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    const [passwordType, SetPasswordType] = useState('password');

    const submit = (values) => {
        dispatch(Actions.authenticateUser(values));
    };
    const changePasswordType = () => {
        if (passwordType === 'password') {
            SetPasswordType('text');
        } else {
            SetPasswordType('password');
        }
    };

    return (
        <div>
            <CustomLogin
                changeRoute={changeRoute}
                change={change}
                handleSubmit={handleSubmit}
                submit={submit}
                changePasswordType={changePasswordType}
                passwordType={passwordType}
                PROJECT_DETAILS={PROJECT_DETAILS}
                LoginLogo={LoginLogo}
                colors={Colors}
            />
        </div>
    );
};

export default LoginView;

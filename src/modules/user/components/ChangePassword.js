import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { renderTextField } from '../../../utils/FormUtils';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { changePassword } from '../actions';
import { changePasswordValidation } from '../validations';
const { Grid, Button } = Components;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    }
}));
function ChangePassword(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [showOldPassword, setShowOldPassword] = React.useState(true);
    const [showNewPassword, setShowNewPassword] = React.useState(true);
    const { handleSubmit } = props;
    const submit = (values) => {
        dispatch(changePassword(values));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <LoadingOverlay >
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='oldPassword' label={I18n.t('old_password')} type={showOldPassword ? 'password' : 'text'} component={renderTextField}
                                adornment={{ isVisible: true, onClick: () => setShowOldPassword(!showOldPassword), show: showOldPassword }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='password' label={I18n.t('new_password')} type={showNewPassword ? 'password' : 'text'} component={renderTextField}
                                adornment={{ isVisible: true, onClick: () => setShowNewPassword(!showNewPassword), show: showNewPassword }} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}


export default reduxForm({
    form: 'changePassword',
    validate: changePasswordValidation

})(ChangePassword);


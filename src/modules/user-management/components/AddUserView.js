import React, { useEffect } from 'react';
import { change, Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components, I18n } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addUser, edituserBasicDetails, loadGender } from '../actions';
import { Gender, STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import { getUserById, getUserTypes } from '../actions';
import { addUserValidation } from '../validations';
const { Grid, Button, LoadingOverlay, CardComponent } = Components;

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

function AddUserView(props) {
    const { id = null } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleSubmit } = props;
    useEffect(() => {
        dispatch(loadGender());
        if (id) {
            dispatch(getUserById(id));
        }
    }, [id]);
    useEffect(() => {
        dispatch(getUserTypes());

    }, []);

    const userManagementValues = useSelector(state => state[STATE_REDUCER_KEY]);


    const { singleUser, getUserType, getGender } = userManagementValues;
    const { data } = getUserType;
    const { singleUserOnly } = singleUser;


    const submit = (values) => {
        // dateOfBirth
        if (id) {
            let objectForEdit = {
                ...values,
                userTypeId: values?.userTypeResponse?.id || 0,
                gender: _.get(values, 'genderResponse.id', 0),
                dateOfBirth: _.get(values, 'dob', '')

            };
            delete objectForEdit.userTypeResponse;
            delete objectForEdit.dob;
            delete objectForEdit.genderResponse;
            dispatch(edituserBasicDetails(id, objectForEdit));
        } else {
            let objectForPost = {
                ...values,
                userTypeId: _.get(values, 'userTypeResponse.id', 0),
                gender: _.get(values, 'genderResponse.id', 0),
                dateOfBirth: _.get(values, 'dob', '')

            };
            delete objectForPost.userTypeResponse;
            delete objectForPost.dob;
            delete objectForPost.genderResponse;
            dispatch(addUser(objectForPost));
        }
    };


    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay active={getUserType.requestInProgress}>
                        <Grid container className={classes.item}>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='firstName' label={I18n.t('first_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='middleName' label={I18n.t('middle_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='lastName' label={I18n.t('last_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='username' label={I18n.t('user_name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='genderResponse' label={I18n.t('gender')} component={renderSelect} >
                                    {
                                        // getGender?.data?.map(item => ({ id: item.id, name: item.name }))
                                        _.get(getGender, 'data', Gender)
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field type='date' name='dob' defaultValue="2017-05-24" label={I18n.t('date_of_birth')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name='userTypeResponse' label={I18n.t('user_type')} component={renderSelect} filterable={false} onChange={(value) =>
                                    change('userType', value)}>
                                    {
                                        data?.map(item => ({ id: item.id, name: item.name }))
                                    }
                                </Field>
                            </Grid>
                            {
                                id === null ? (
                                    <Grid container >
                                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                            <Field name='password' label={I18n.t('password')} component={renderTextField} type='password' />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                            <Field name='confirmPassword' label={I18n.t('confirm_password')} component={renderTextField} type='password' />
                                        </Grid>
                                    </Grid>
                                )
                                    : null
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.submit}>
                            <Button type="submit">{_.has(singleUserOnly, 'id') ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            </div>
        </CardComponent>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].singleUser.singleUserOnly
}))(reduxForm({
    form: 'addUserForm',
    enableReinitialize: true,
    validate: addUserValidation
})(AddUserView));


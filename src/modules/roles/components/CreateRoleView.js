import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect, renderTextAreaField } from '../../../utils/FormUtils';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY, REGULAR_ROLE, ORGANIZATION_ROLE } from '../constants';
import { addRole, setRoleType } from '../actions';
import { Components, I18n, makeStyles } from '../../../common/components';
const { Grid, Button, CardComponent, LoadingOverlay } = Components;
import { useParams } from 'react-router-dom';
import { isLetters } from '../../../utils/ValidationUtils';

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
const upper = value => value && value.toUpperCase();
const validate = (values) => {
    const errors = {};
    if (!_.has(values, 'name') || _.get(values, 'name', null) === null) {
        _.set(errors, 'name', I18n.t('required', { type: I18n.t('name') }));
    }
    if (!values.roleType) {
        errors.roleType = I18n.t('required', { type: I18n.t('role_type') });
    }
    if (!values.title) {
        errors.title = I18n.t('required', { type: I18n.t('title') });
    }
    if (!values.description) {
        errors.description = I18n.t('required', { type: I18n.t('description') });
    }
    if (!values.key) {
        errors.key = I18n.t('required', { type: I18n.t('key') });
    }
    if (values.key) {
        let str = '';
        str = values.key;
        if (!isLetters(str)) {
            errors.key = I18n.t('must_be', { type: I18n.t('string') });
        }
    }
    return errors;
};

function CreateRoleView(props) {
    // eslint-disable-next-line no-unused-vars
    const { id, roleType } = useParams(); // added to fix language translation re-rendering
    const dispatch = useDispatch();
    const classes = useStyles();
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { setRoleType: singleRoletype, addNew } = initialValues;
    const { change, handleSubmit } = props;
    React.useEffect(() => {
        if (roleType === REGULAR_ROLE) {
            change('roleType', { id: 1, name: 'Regular' });
            dispatch(setRoleType([{ id: 1, name: 'Regular' }]));
        } else if (roleType === ORGANIZATION_ROLE) {
            change('roleType', { id: 2, name: 'ORGANIZATIONALRole' });
            dispatch(setRoleType([{ id: 2, name: 'ORGANIZATIONALRole' }]));
        }

    }, []);
    const submit = (values) => {
        let data = {
            ...values,
            roleTypeId: values.roleType,
            key: 'ROLE_' + values.key
        };
        dispatch(addRole(data, roleType));
    };

    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay active={addNew.apiStatus.save.requestInProgress}>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='name' label={I18n.t('name')} type='text' component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="roleType" label={I18n.t('role_type')} component={renderSimpleSelect} onChange={(value) =>
                                change('roleType', value)}>
                                {
                                    _.get(singleRoletype, 'data', [])
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='title' label={I18n.t('title')} type='text' component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='description' label={I18n.t('description')} type='text' placeholder={I18n.t('description')} component={renderTextAreaField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name='key' label={I18n.t('key')} type='text' placeholder='Key' component={renderTextField} normalize={upper} />
                        </Grid>
                        <Grid item xs={12} className={classes.submit}>
                            <Button type="submit">{I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            </div>
        </CardComponent>
    );
}

export default reduxForm({
    form: 'addRoleForm',
    validate
})(CreateRoleView);


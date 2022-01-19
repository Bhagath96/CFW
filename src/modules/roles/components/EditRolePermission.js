
import React, { useEffect } from 'react';
import { Field, Form, reduxForm, FormSection } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Components, I18n, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import _ from '../../../utils/LodashUtils';
import { renderSelect } from '../../../utils/FormUtils';
import * as Actions from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';

const { Grid, Button } = Components;

const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

function EditRolePermission(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Actions.listPermissionControllers());
    }, []);

    const { change, handleSubmit } = props;
    const classes = useStyles();
    const { id } = useParams();

    const roleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { controllerPermissions: { data: resources } = {}, resourceActionsList, resourceActions: { actions }, requestInProgress, updateRolePermission } = roleDetails;
    const { data } = resourceActionsList;
    let { resource } = data;
    let resourceActionArrays = _.get(resource, 'resourceActions', []);

    useEffect(() => {
        change('actions', actions);
    }, []);

    const renderCheckBoxes = (list) => {
        let checkBoxData = list.map((item) => {
            return <Grid key={item.id} item xs={4} sm={4} md={4}>
                <Field
                    component="input"
                    name={item.bitwiseValue}
                    type="checkbox" />
                <span>{item.label}</span>
            </Grid>;
        });
        return checkBoxData;
    };

    const submit = (values) => {
        let objToSend = {
            ...values,
            resourcePermissionId: _.get(resourceActionsList, 'data.id', null),
            resourceId: _.get(values, 'resourceId.id', null),
            roleId: Number(id)
        };
        dispatch(Actions.saveResourceActions(objToSend));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                    <Field showLoader={requestInProgress} spinnerProps="selectTagProp" name='resourceId' label={I18n.t('resources')} component={renderSelect}
                        onChange={(resourceItem) => {
                            change('resourceId', resourceItem.id);
                            dispatch(Actions.fetchResourceActions({ resourceId: resourceItem.id, roleId: id }));
                            dispatch(Actions.setData({ type: 'resourceId', data: resourceItem }));
                        }}>
                        {
                            resources.map(item => ({ id: item.id, name: item.label }))
                        }
                    </Field>
                </Grid>
                <LoadingOverlay active={updateRolePermission.requestInProgress}>
                    <FormSection name="actions">
                        <Grid container>
                            {renderCheckBoxes(resourceActionArrays)}
                        </Grid>
                    </FormSection>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].resourceActions
    }))(reduxForm({
        form: 'EditRolePermission',
        enableReinitialize: true
    })(EditRolePermission));

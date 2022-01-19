import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Actions from '../actions';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, I18n, makeStyles } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
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

function RoleAssignUsers(props) {
    const classes = useStyles();
    const { id } = useParams();
    props.change('roleId', id);
    const dispatch = useDispatch();
    const roleDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignUsersList, RoleAssigniee } = roleDetails;

    useEffect(() => {
        dispatch(Actions.getUsersBasedOnRoleId(id));
    }, []);
    const submit = (values) => {
        dispatch(Actions.updateUsersInRole(values));
    };

    const renderCheckBoxes = (list) => {
        let data = list.map((item) => {
            return <Grid key={item.id} item xs={4} sm={4} md={4}>
                <Field
                    component="input"
                    name={item.id}
                    type="checkbox" />
                <span>{item.name}</span>
            </Grid>;
        });
        return data;
    };

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={RoleAssigniee.requestInProgress || assignUsersList.requestInProgress}>
                <FormSection name="users">
                    <Grid container>
                        {renderCheckBoxes(_.get(assignUsersList, 'data', []))}
                    </Grid>
                </FormSection>
                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
            </LoadingOverlay>
        </Form>
    );
}


export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignUsers
}))(reduxForm({
    form: 'RoleAssignUsers',
    enableReinitialize: true
})(RoleAssignUsers));

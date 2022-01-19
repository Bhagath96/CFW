import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, I18n, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import { useParams } from 'react-router-dom';
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
const renderCheckBoxes = (list) => {
    if (list.length !== {}) {
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
    }
};
function AssignRolesView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const OrganizationDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignRoleList, assignRoleListEdit } = OrganizationDetails;
    const { requestInProgress: requestInStatus = false } = assignRoleListEdit;
    const { requestInProgress = false } = assignRoleList;
    const { id } = useParams();

    useEffect(() => {
        dispatch(Actions.loadRoleListForUser(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.updateUserRoleMapping(id, values));
    };

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={requestInProgress}>
                <FormSection name="users">
                    <Grid container>
                        {renderCheckBoxes(_.get(assignRoleList, 'data', []))}
                    </Grid>
                </FormSection>

                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <LoadingOverlay active={requestInStatus}>
                        <Button type="submit" disabled={_.get(assignRoleList, 'data', []) < 1}>{I18n.t('Submit')}</Button>
                    </LoadingOverlay>
                </Grid>
            </LoadingOverlay>
        </Form>
    );
}
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignRole
}))(reduxForm({
    form: 'AssignRoleForm',
    enableReinitialize: true
})(AssignRolesView));

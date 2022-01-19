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

function AssignUserGroupView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const UserGroupDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignUserGroupList, assignUserGroupListEdit } = UserGroupDetails;
    const { requestInProgress: reqStatus } = assignUserGroupListEdit;

    const { requestInProgress } = assignUserGroupList;
    const { id } = useParams();
    useEffect(() => {
        dispatch(Actions.loadUserGroupListListForUser(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.updateUserUserGroupMapping(id, values));
    };

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={requestInProgress}>
                <FormSection name="userGroups">
                    <Grid container>
                        {renderCheckBoxes(_.get(assignUserGroupList, 'data', []))}
                    </Grid>
                </FormSection>


                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <LoadingOverlay active={reqStatus}>
                        <Button type="submit" disabled={_.get(assignUserGroupList, 'data', []) < 1}>{I18n.t('submit')}</Button>
                    </LoadingOverlay>

                </Grid>
            </LoadingOverlay>
        </Form>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignUserGroup
}))(reduxForm({
    form: 'AssignUserGroupForm',
    enableReinitialize: true
})(AssignUserGroupView));

import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import { useParams } from 'react-router-dom';
import i18n from '../../../i18n';

const { Grid, Button, CardComponent, LoadingOverlay } = Components;

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

export const AssignUsersView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userGroupDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignUsersList, editUserGroup } = userGroupDetails;
    const { id } = useParams();

    useEffect(() => {
        dispatch(Actions.fetchUsersByUserGroup(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.updateUsersInGUserGroup({ ...values, userGroupId: id }));
    };

    return (
        <CardComponent>
            <div>
                <Form onSubmit={props.handleSubmit(submit)}>
                    <LoadingOverlay active={editUserGroup.requestInProgress || assignUsersList.requestInProgress}>
                        <FormSection name="users">
                            <Grid container >
                                {renderCheckBoxes(_.get(assignUsersList, 'data', []))}
                            </Grid>
                        </FormSection>
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{i18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            </div>
        </CardComponent>
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignUsers
}))(reduxForm({
    form: 'AssignUsers',
    enableReinitialize: true
})(AssignUsersView));

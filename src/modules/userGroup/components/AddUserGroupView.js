import React, { useEffect } from 'react';
import { Field, Form, FormSection } from 'redux-form';
import { renderTextField } from '../../../utils/FormUtils';
import { makeStyles, Components, I18n } from '../../../common/components';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { useSelector } from 'react-redux';
import _ from '../../../utils/LodashUtils';

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
export const AddUserGroupView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id = null } = useParams();
    const { handleSubmit } = props;
    const userGroupDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { addUserGroup, editData } = userGroupDetails;

    useEffect(() => {
        if (id) {
            dispatch(Actions.getUserGroupById(id));
        } else {
            dispatch(Actions.resetForm());
        }
    }, []);
    const onSubmit = (values) => {
        dispatch(Actions.saveUserGroup(_.get(values, 'addUserGroup', {})));
    };
    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <LoadingOverlay active={addUserGroup.requestInProgress || editData.requestInProgress}>
                        <FormSection name="addUserGroup">
                            <Grid container className={classes.item}>
                                <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
                                    <Field name="name" label={I18n.t('group_name')} component={renderTextField} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
                                    <Field name="description" label={I18n.t('description')} component={renderTextField} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4} className={classes.item}>
                                    <Field name="key" label={I18n.t('group_key')} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </FormSection>
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{I18n.t('submit')}</Button>
                        </Grid>
                    </LoadingOverlay>
                </Form>
            </div>
        </CardComponent>
    );
};

export default AddUserGroupView;



import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../common/components';
import { renderSelect } from '../../../utils/FormUtils';

import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { AssignUsersFormValidation } from '../validations';
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
    let data = list?.map((item) => {
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
function AssignUsersView(props) {
    const { change, handleSubmit } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const OrganizationDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignOrganisationList, assignOrgListEdit } = OrganizationDetails;
    const { requestInProgress: reqStatus } = assignOrgListEdit;
    const { requestInProgress } = assignOrganisationList;
    const { id } = useParams();
    change('organizationId', id);

    useEffect(() => {
        dispatch(Actions.loadOrganisationListForUser(id));
    }, []);

    const submit = (values) => {
        let newObj = {
            defaultOrganizationId: 0,
            users: null,
            organizationId: id
        };
        newObj.defaultOrganizationId = values.defaultOrganization?.id;
        newObj.users = values.users;
        dispatch(Actions.updateUserOrganizationMapping(id, newObj));
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <LoadingOverlay active={requestInProgress}>
                <FormSection name="users">
                    <Grid container>
                        {renderCheckBoxes(_.get(assignOrganisationList, 'data.associations', []))}
                    </Grid>
                </FormSection>
                <br></br>

                <div>
                    <Grid container >
                        <Field spinnerProps="selectTagProp" name='defaultOrganization' label={I18n.t('default_organization')} component={renderSelect}
                            onChange={(values) => {
                                change('defaultOrganizationId', values.id);
                            }}
                        >
                            {
                                _.get(assignOrganisationList, 'data.associations', [])

                            }
                        </Field>
                    </Grid>
                </div>
                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <LoadingOverlay active={reqStatus}>
                        <Button type="submit" disabled={_.get(assignOrganisationList, 'data', []) < 1}>{I18n.t('submit')}</Button>
                    </LoadingOverlay>
                </Grid>
            </LoadingOverlay>
        </Form>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignOrganisation
}))(reduxForm({
    form: 'AssignUsersForm',
    enableReinitialize: true,
    validate: AssignUsersFormValidation
})(AssignUsersView));

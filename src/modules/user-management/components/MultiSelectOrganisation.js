import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderSelect } from '../../../utils/FormUtils';
import { makeStyles, Components } from '../../../common/components';
import { useDispatch, useSelector } from 'react-redux';
const { Grid, Button } = Components;
// import { listOrganization } from '../../organization/actions';
import { addMultpleOrganisation } from '../actions';
const STATE_ORGANISATION_KEY = 'organization';
import _ from '../../../utils/LodashUtils';

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

function MultiSelectOrganisation(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    useEffect(() => {
        // dispatch(listOrganization());
    }, []);
    const OrganisationValue = useSelector(state => state[STATE_ORGANISATION_KEY]);
    const { listOrganisation } = OrganisationValue;
    const submit = (values) => {
        dispatch(addMultpleOrganisation(values));
    };
    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                    <Field name="organisation" label="Organisation" component={renderSelect} multiple={true} onChange={(value) => {
                        change('organisation', value);
                    }}>
                        {
                            _.get(listOrganisation, 'data', [])
                        }
                    </Field>
                </Grid>
                <Grid item xs={12} className={classes.submit}>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Form>
        </div>
    );
}

export default reduxForm({
    form: 'MultiSelectOrganisation'
})(MultiSelectOrganisation);


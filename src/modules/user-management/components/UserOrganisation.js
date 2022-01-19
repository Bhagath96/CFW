import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components } from '../../../common/components';
import { renderSelect } from '../../../utils/FormUtils';
import { useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';

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

//update organization
function UserOrganization(props) {
    const classes = useStyles();
    const { change, handleSubmit } = props;
    const listOrganization = useSelector(state => state[STATE_REDUCER_KEY].listOrganisation);
    const submit = () => {
    };
    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Grid container>
                    <Grid item sm={4} className={classes.item}>
                        <Field name="organization" label="Update Organization" component={renderSelect} onChange={(value) =>
                            change('organization', value)}>
                            {
                                _.get(listOrganization, 'data', [])
                            }
                        </Field>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.submit}>
                    <Button type="submit">Update</Button>
                </Grid>
            </Form>
        </div>
    );
}

export default reduxForm({
    form: 'UserOrganizationForm'
})(UserOrganization);



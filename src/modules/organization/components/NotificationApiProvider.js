import React, { useEffect } from 'react';
import { Form, Field, FormSection, reduxForm } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_TYPES } from '../constants';
import { getNotificationApiProvider, sentApiProviderKey, sentApiProviderKeyForPost } from '../actions';
import { Components, makeStyles, I18n } from '../../../common/components';
const { Grid, Button } = Components;
import { STATE_REDUCER_KEY } from '../constants';

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

function NotificationApiProvider(props) {
    const classes = useStyles();
    const { id = 0 } = useParams();
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    const apiProvider = useSelector(state => state[STATE_REDUCER_KEY].apiProviders.data.Notification);
    const apikeyProviderId = useSelector(state => state[STATE_REDUCER_KEY].notificationApiProvider.formData.id);

    useEffect(() => {
        dispatch(getNotificationApiProvider(id, API_TYPES.NOTIFICATION));

    }, []);
    const submit = (values) => {
        const { formData: { apiProvider: provider, ...rest } } = values;
        let sendingObject = {
            ...rest,
            apiProviderId: provider?.id
        };
        if (apikeyProviderId) {
            dispatch(sentApiProviderKey(id, sendingObject));
        } else {
            sendingObject.apiProviderId = values?.formData?.apiProvider;
            dispatch(sentApiProviderKeyForPost(id, sendingObject));
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <FormSection name="formData">
                    <Grid container>

                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="apiProvider" label={I18n.t('provider')} component={renderSimpleSelect} onChange={(provider) => {
                                let value = { id: provider.target.value };
                                change('formData.apiProvider', value);
                            }
                            }>
                                {
                                    apiProvider
                                }
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="key" label={I18n.t('key')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="clientId" label={I18n.t('client_id')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="clientSecret" label={I18n.t('client_secret')} component={renderTextField} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>
                            <Field name="endPoint" label={I18n.t('end_point')} component={renderTextField} />
                        </Grid>
                    </Grid>
                </FormSection>
                <Grid item xs={12} className={classes.submit}>
                    <Button type="submit" >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </div>
    );
}

// export default NotificationApiProvider;

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].notificationApiProvider
}))(reduxForm({
    form: 'NotificationApiProviderForm',
    enableReinitialize: true
})(NotificationApiProvider));


import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ApiProviderControlsView } from '../components';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { getOrganization, getApiProviders } from '../selectors';
import { API_TYPES } from '../constants';
import * as Actions from '../actions';
import _ from '../../../utils/LodashUtils';

const ApiProviderControls = (props) => {
    const { change, organization, type } = props;

    useEffect(() => {
        // creates a hidden prop to identify form type
        change('formData.type', type);

        switch (type) {
            case API_TYPES.SMS:
                change('formData', _.get(organization, [API_TYPES.SMS], {}));
                break;

            case API_TYPES.EMAIL:
                change('formData', _.get(organization, [API_TYPES.EMAIL], {}));
                break;

            case API_TYPES.NOTIFICATION:
                change('formData', _.get(organization, [API_TYPES.NOTIFICATION], {}));
                break;

            case API_TYPES.PAYMENT:
                change('formData', _.get(organization, [API_TYPES.PAYMENT], {}));
                break;

            default:
                break;
        }
    }, []);
    return (
        <ApiProviderControlsView {...props} />
    );
};

const validate = () => {
    const errors = {};
    return errors;
};

const mapStateToProps = createStructuredSelector({
    organization: getOrganization,
    providers: getApiProviders
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (values) => dispatch(Actions.saveOrganizationAPIProviders(_.get(values, 'formData', {})))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ApiProviderControlsForm',
    enableReinitialize: true,
    validate
})(ApiProviderControls));

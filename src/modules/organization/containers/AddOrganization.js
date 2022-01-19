import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import { AddOrganizationView } from '../components';
import { getOrganizationAddNew, getOrganization } from '../selectors';
import { AddOrganizationValidation } from '../validations';

export const AddOrganization = (props) => {
    const { loadParentOrganizations, loadOrganizationTypes } = props;

    useEffect(() => {
        loadParentOrganizations();
        loadOrganizationTypes();
    }, []);

    return (
        <AddOrganizationView {...props} />
    );
};

const mapStateToProps = createStructuredSelector({
    initialValues: getOrganizationAddNew,
    organization: getOrganization

});

const mapDispatchToProps = dispatch => ({
    loadParentOrganizations: () => dispatch(Actions.loadParentOrganizations()),
    loadOrganizationTypes: () => dispatch(Actions.loadOrganizationTypes())

});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AddOrganizationForm',
    enableReinitialize: true,
    validate: AddOrganizationValidation
})(AddOrganization));

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { AddUserGroupView } from '../components';
import { getAddUserGroup } from '../selectors';
import { addUserGroupValidation } from '../validations';

export const AddUserGroup = (props) => {
    return (
        <AddUserGroupView {...props} />
    );
};

const mapStateToProps = createStructuredSelector({
    initialValues: getAddUserGroup
});

export default connect(mapStateToProps)(reduxForm({
    form: 'AddUserGroupForm',
    enableReinitialize: true,
    validate: addUserGroupValidation
})(AddUserGroup));

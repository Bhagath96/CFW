import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ListUserGroupView } from '../components';

export const ListUserGroup = (props) => {
    return (<ListUserGroupView {...props} />);
};

export default connect()(reduxForm({
    form: 'ListUserGroupForm'
})(ListUserGroup));

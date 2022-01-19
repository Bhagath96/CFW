import React from 'react';
import { connect } from 'react-redux';
import { ApiProvidersView } from '../components';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { getFilters } from '../selectors';
import * as Actions from '../actions';

export const ApiProviders = (props) => {
    return (
        <ApiProvidersView {...props} />
    );
};

const mapStateToProps = createStructuredSelector({
    filter: getFilters
});

const mapDispatchToProps = dispatch => ({
    setFilter: (values) => dispatch(Actions.setFilters(values))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ApiProvidersForm'
})(ApiProviders));

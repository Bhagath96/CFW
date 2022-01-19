import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getFilters } from '../selectors';
import { createStructuredSelector } from 'reselect';
import { OrganizationMainPageView } from '../components/OrganizationMainPageView';
import * as Actions from '../actions';

export const OrganizationMainPage = (props) => {
    return (
        <OrganizationMainPageView {...props} />
    );
};

const mapStateToProps = createStructuredSelector({
    filter: getFilters
});

const mapDispatchToProps = dispatch => ({
    setFilter: (values) => {
        dispatch(Actions.setFilters(values));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'OrganizationMainPage'
})(OrganizationMainPage));

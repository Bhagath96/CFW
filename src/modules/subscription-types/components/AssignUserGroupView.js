import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { STATE_REDUCER_KEY } from '../constant';

import { Components, I18n, makeStyles } from '../../../common/components';
import { TABLE_IDS } from '../constant';
import * as Actions from '../actions';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import CardComponent from '../../../common/components/custom/CardComponent';
const { Grid, Button, MUIDataTable } = Components;

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

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'name', columnName: 'name', apiParam: 'userNames', filterBy: 'id' }
];

const AssignUserGroupView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedUserGroupsOnly, setUnassignedUserGroupsOnly] = useState(false);
    const [rowsSelected, setRowsSelected] = useState([]);

    const {
        resetTableFilterList, setPassedColumnsForTable,
        conditionalReload, setPagination, setChips, setPageProps,
        setSelectedUserGroups,
        tableProps: {
            [TABLE_IDS.LIST_USER_GROUP]: {
                selectedIds = []
            } = {} }
    } = props;
    const { tableProps: { [TABLE_IDS.LIST_USER_GROUP]: { pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { listUserGroups: { data: content = [], requestInProgress = false } = {} } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));

    // const setFilterItems = (data) => {
    //     setChips(data);
    //     loadAssignUserGroupToUser();
    // };

    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setRowsSelected(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => customer.data[0]);
        setSelectedUserGroups(ids);
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        resetTableFilterList({ subscriptionTopicId: id });
        dispatch(resetFilter({ key: TABLE_IDS.LIST_USER_GROUP }));
        setChips({});
        setSelectedUserGroups([]);
        dispatch(Actions.listUserGroups({ id, member }));
    }, []);

    useEffect(() => {
        if (selectedIds.length === 0) {
            setRowsSelected([]);
        }
    }, [selectedIds]);


    let options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        selectableRows: 'multiple',
        rowsSelected: rowsSelected,
        filter: false,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setSelectedUserGroups([]);

                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setSelectedUserGroups([]);
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'rowSelectionChange':
                    setSelectedRows(tableState);
                    break;
                default:
                    break;
            }
        }
    };

    const columProps = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filter: false
            }
        }
    ];

    const submit = () => {
        let assignUserGroupObj = {
            idsToAssociate: selectedIds,
            member: member
        };
        // updateUserOrganizationMapping({ users, subscriptionTopicId: id });
        dispatch(Actions.submitUserGroup({ assignUserGroupObj, subscriptionTopicId: id }));
    };

    const onUnassignedUserGroupsOnlyClick = event => {
        setSelectedUserGroups([]);
        let flag = event.target.checked || false;
        setUnassignedUserGroupsOnly(flag);
        conditionalReload({ unassignedUserGroupsOnly: flag, member, id });
    };

    const onMemberClick = event => {
        setUnassignedUserGroupsOnly(false);
        setSelectedUserGroups([]);
        let flag = event.target.checked || false;
        setMember(flag);
        props.change('unassignedUserGroupsOnly', false);
        conditionalReload({ unassignedUserGroupsOnly, member: flag, id });
    };

    return (
        <CardComponent>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container>
                    <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('user_groups_belong_to_subscription_topic')}</span><br /><br /></Grid>
                    {!member && <Grid item xs={12} sm={6}><Field component="input" name='unassignedUserGroupsOnly' type="checkbox" onClick={onUnassignedUserGroupsOnlyClick} /><span>{I18n.t('user_groups_dont_belong_to_subscription_topic')}</span><br /><br /></Grid>}
                </Grid>
                <MUIDataTable
                    title={I18n.t('assign_user_group')}
                    options={options}
                    columns={columProps}
                    data={content}
                    requestInProgress={requestInProgress}
                />
                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{!member ? I18n.t('assign') : I18n.t('unassign')}</Button>
                </Grid>
            </Form>
        </CardComponent>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, subscriptionTopicId, selectedValue) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_USER_GROUP, url: URL.ROLE.LIST_ORGANISATION_ROLE.replace(':orgId', subscriptionTopicId).replace(':roleId', selectedValue) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_USER_GROUP }));
        }
    },
    loadAssignUserGroupToUser: (data) => dispatch(Actions.listUserGroups(data)),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_USER_GROUP, passedColumns: data })),
    updateUserOrganizationMapping: (data) => dispatch(Actions.updateUserOrganizationMapping(data)),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_USER_GROUP, filterState: data })),
    resetTableFilterList: ({ subscriptionTopicId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_USER_GROUP, additionalFilters: { unassignedUserGroupsOnly: false, member: false, subscriptionTopicId } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_USER_GROUP, pagination: data }));
        dispatch(Actions.listUserGroups());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_USER_GROUP, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_USER_GROUP, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_USER_GROUP, additionalFilters: data }));
        dispatch(Actions.listUserGroups(data));
    },
    setSelectedUserGroups: (data) => dispatch(setSelectedIds({ key: TABLE_IDS.LIST_USER_GROUP, selectedIds: data }))
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignUserGroupView'
})(AssignUserGroupView));

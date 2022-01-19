import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { Components, I18n, makeStyles } from '../../../common/components';
import { TABLE_IDS } from '../constants';
import * as Actions from '../actions';
import { getOrganizationAssignUsersList } from '../selectors';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
const { Grid, Button, MUIDataTable, PickySelect, Typography } = Components;

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
    { columnLabel: 'user_name', columnName: 'username', apiParam: 'usernames', filterBy: 'id' },
    { columnLabel: 'first_name', columnName: 'firstName', apiParam: 'firstNames', filterBy: 'id' },
    { columnLabel: 'middle_name', columnName: 'middleName', apiParam: 'middleNames', filterBy: 'id' },
    { columnLabel: 'last_name', columnName: 'lastName', apiParam: 'lastNames', filterBy: 'id' }
];

const AssignUsersView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedUsersOnly, setUnassignedUsersOnly] = useState(false);
    const [rowsSelected, setRowsSelected] = useState([]);

    const {
        getDropdownFilterList, resetTableFilterList, setAssignUsersFilter, setPassedColumnsForTabel,
        conditionalReload, setPagination, setChips, setPageProps,
        loadUsers, updateUserOrganizationMapping, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.ASSIGN_ORG_USERS]: {
                selectedIds = []
            } = {} },
        assignUsers: {
            requestInProgress: assignUsersListRequestInProgress = false,
            data: { content: assignUsersList = [] } = {},
            searchKeys }
    } = props;
    const { tableProps: { [TABLE_IDS.ASSIGN_ORG_USERS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setChips(data);
        loadUsers();
    };

    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setRowsSelected(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => customer.data[0]);
        setSelectedUsers(ids);
    };

    useEffect(() => {
        setPassedColumnsForTabel(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        resetTableFilterList({ organizationId: id });
        dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
        setChips({});
        setSelectedUsers([]);
        loadUsers();

    }, []);

    useEffect(() => {
        if (selectedIds.length === 0) {
            setRowsSelected([]);
        }
    }, [selectedIds]);

    const resettingChip = (chipIndex, chipValue, chipList) => {
        setSelectedUsers([]);
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setAssignUsersFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        setSelectedUsers([]);
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    let options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        selectableRows: 'multiple',
        rowsSelected: rowsSelected,
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setSelectedUsers([]);

                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setSelectedUsers([]);
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    setSelectedUsers([]);
                    dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
                    setFilterItems({});
                    break;
                case 'rowSelectionChange':
                    setSelectedRows(tableState);
                    break;
                // case 'filterChange':
                //     loadUsers();
                //     break;
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
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[1].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[1].columnName}
                                    name={passedColumns[1].columnName}
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignUsersFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        // if (val.length > 0) {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[1].columnName, ''), [passedColumns[1].columnName], id);
                                        // }
                                        // } else if (val.length === 0) {
                                        //     console.log('when no value applied');
                                        //     dispatch(setFilterValuesToInitialValue({ key: TABLE_IDS.ASSIGN_ORG_USERS }))
                                        // }
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        },
        {
            name: passedColumns[2].columnName,
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[2].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[2].columnName}
                                    name={passedColumns[2].columnName}
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignUsersFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[2].columnName, ''), [passedColumns[2].columnName], id);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filter: false
            }
        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[4].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[4].columnName}
                                    name={passedColumns[4].columnName}
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignUsersFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        // console.log('***********************')
                                        // if (val.length > 1) {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[4].columnName, ''), [passedColumns[4].columnName], id);
                                        // }
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        }
    ];

    const submit = () => {
        let users = _.map(selectedIds, (user) => ({ id: user, member: !member }));
        updateUserOrganizationMapping({ users, organizationId: id });
    };

    const onUnassignedUsersOnlyClick = event => {
        setSelectedUsers([]);
        let flag = event.target.checked || false;
        setUnassignedUsersOnly(flag);
        conditionalReload({ unassignedUsersOnly: flag, member, organizationId: id });
    };

    const onMemberClick = event => {
        setUnassignedUsersOnly(false);
        setSelectedUsers([]);
        let flag = event.target.checked || false;
        setMember(flag);
        props.change('unassignedUsersOnly', false);
        conditionalReload({ unassignedUsersOnly, member: flag, organizationId: id });
    };

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <Grid container>
                <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('users_assigned_in_current_organization')}</span><br /><br /></Grid>
                {!member && <Grid item xs={12} sm={6}><Field component="input" name='unassignedUsersOnly' type="checkbox" onClick={onUnassignedUsersOnlyClick} /><span>{I18n.t('show_users_un_assigned_to_any_organizations')}</span><br /><br /></Grid>}
            </Grid>
            <MUIDataTable
                title={I18n.t('assign_user')}
                options={options}
                columns={columProps}
                data={assignUsersList}
                requestInProgress={assignUsersListRequestInProgress}
            />
            <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                <Button type="submit">{!member ? I18n.t('assign') : I18n.t('unassign')}</Button>
            </Grid>
        </Form>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, organizationId) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.ASSIGN_ORG_USERS, url: URL.ORGANIZATION.FETCH_USER_ORGANIZATION_MAPPING.replace(':organizationId', organizationId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
            // dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
        }
    },
    loadUsers: () => dispatch(Actions.fetchOrganizationAssignUsers({ pagination: false })),
    setPassedColumnsForTabel: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.ASSIGN_ORG_USERS, passedColumns: data })),
    updateUserOrganizationMapping: (data) => dispatch(Actions.updateUserOrganizationMapping(data)),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.ASSIGN_ORG_USERS, filterState: data })),
    resetTableFilterList: ({ organizationId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_ORG_USERS, additionalFilters: { unassignedUsersOnly: false, member: false, organizationId } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS }));
        dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_ORG_USERS, pagination: data }));
        // dispatch()
        dispatch(Actions.fetchOrganizationAssignUsers());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.ASSIGN_ORG_USERS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_ORG_USERS, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_ORG_USERS, additionalFilters: data }));
        dispatch(Actions.fetchOrganizationAssignUsers());
    },
    setSelectedUsers: (data) => dispatch(setSelectedIds({ key: TABLE_IDS.ASSIGN_ORG_USERS, selectedIds: data }))
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps,
    assignUsers: getOrganizationAssignUsersList
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignUsers'
})(AssignUsersView));

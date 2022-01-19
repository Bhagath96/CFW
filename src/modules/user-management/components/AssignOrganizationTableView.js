import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { STATE_REDUCER_KEY } from '../constants';

import { Components, I18n, makeStyles } from '../../../common/components';
import { TABLE_IDS } from '../constants';
import * as Actions from '../actions';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { renderSelect } from '../../../utils/FormUtils';
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
    { columnLabel: 'name', columnName: 'name', apiParam: 'organizationNames', filterBy: 'id' }

];

const AssignOrganizationUnderUserView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedOrgOnly, setUnassignedUsersOnly] = useState(false);

    const [rowsSelected, setRowsSelected] = useState([]);

    const {
        change, getDropdownFilterList, resetTableFilterList, setAssignUsersFilter, setPassedColumnsForTable,
        resetForm, conditionalReload, setPagination, setChips, setPageProps,
        loadAssignOrganizationUnderUser, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER]: {
                selectedIds = []
            } = {} }
    } = props;
    const { tableProps: { [TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { assignOrganisationList, assignOrganizationForUser: { data: assignOrgUserData = [], requestInProgress = false, searchKeys = [] } = {} } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));

    const setFilterItems = (data) => {
        setChips(data);
        loadAssignOrganizationUnderUser({ id });
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
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        resetTableFilterList({ userId: id });
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
        setChips({});
        setSelectedUsers([]);
        dispatch(Actions.loadOrganisationListForUser(id));
        loadAssignOrganizationUnderUser({ id });


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
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
                    setFilterItems({});
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization.name', ''), [passedColumns[1].columnName], id);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        }
    ];

    const submit = (values) => {
        let assignOrgObj = {
            organizationIds: selectedIds,
            member: member
        };
        dispatch(Actions.submitAssignOrganizationUnderUser({ assignOrgObj, userId: id, defaultOrganizationId: values?.defaultOrganizationId }));
        resetForm();
    };

    const onUnassignedUsersOnlyClick = event => {
        setSelectedUsers([]);
        let flag = event.target.checked || false;
        setUnassignedUsersOnly(flag);
        conditionalReload({ unassignedOrgOnly: flag, member, userId: id });
    };

    const onMemberClick = event => {
        setUnassignedUsersOnly(false);
        setSelectedUsers([]);
        let flag = event.target.checked || false;
        setMember(flag);
        props.change('unassignedOrgOnly', false);
        conditionalReload({
            unassignedOrgOnly, member: flag, userId: id
        });
    };
    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <Grid container>
                <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('organization_belongs_to_the_current_user')}</span><br /><br /></Grid>
                {!member && <Grid item xs={12} sm={6}><Field component="input" name='unassignedOrgOnly' type="checkbox" onClick={onUnassignedUsersOnlyClick} /><span>{I18n.t('organization_dont_have_any_user_association')}</span><br /><br /></Grid>}
            </Grid>
            <MUIDataTable
                title={I18n.t('assign_organization')}
                options={options}
                columns={columProps}
                data={assignOrgUserData?.content || []}
                requestInProgress={requestInProgress}
            />
            <br></br>
            <Grid item xs={12} sm={12} >
                <Field spinnerProps="selectTagProp" name='defaultOrganization' label={I18n.t('default_organization')} component={renderSelect}
                    onChange={(values) => {
                        change('defaultOrganizationId', values.id);
                    }}
                >
                    {
                        _.get(assignOrganisationList, 'data.content', [])

                    }
                </Field>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                <Button type="submit">{!member ? I18n.t('assign') : I18n.t('unassign')}</Button>
            </Grid>
        </Form>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, userId) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, url: URL.USER_MANAGEMENT.FETCH_ASSIGN_ORGANIZATION.replace(':userId', userId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
        }
    },
    loadAssignOrganizationUnderUser: () => dispatch(Actions.fetchAssignOrganizationForUsers({ pagination: false })),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, passedColumns: data })),
    updateUserOrganizationMapping: (data) => dispatch(Actions.updateUserOrganizationMapping(data)),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, filterState: data })),
    resetTableFilterList: ({ userId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, additionalFilters: { unassignedOrgOnly: false, member: false, userId } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, pagination: data }));
        dispatch(Actions.fetchAssignOrganizationForUsers());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, additionalFilters: data }));
        dispatch(Actions.fetchAssignOrganizationForUsers());
    },
    setSelectedUsers: (data) => dispatch(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, selectedIds: data }))
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignOrganizationUnderUserView'
})(AssignOrganizationUnderUserView));

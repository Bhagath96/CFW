import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Swal from 'sweetalert2';
import { STATE_REDUCER_KEY, REGULAR_ROLE, TABLE_IDS } from '../constants';
import { deleteRegularRole, setRoleType, setRole } from '../actions';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
const { MUIDataTable, DottedMenu, PickySelect } = Components;
import { PATH } from '../../../routes';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';

const { AddIcon } = Icons;

function ListRegularRole(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const roleType = REGULAR_ROLE;
    //setting all keys and values to give to api
    const { setPassedColumnsForTable, getDropdownFilterList, setRegularRoleFilter, setPagination, setChips, setPageProps, loadOrganizationRole } = props;
    const { tableProps: { [TABLE_IDS.LIST_REGULAR_ROLE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { listRegularRoles: listRegularRolesFromReducer } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { regularRoles = [], requestInProgress = false, searchKeys } = listRegularRolesFromReducer;
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'title', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'description', columnName: 'description', apiParam: 'descriptions', filterBy: 'name' },
        { columnLabel: 'key', columnName: 'key', apiParam: 'keys', filterBy: 'name' }
    ];

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadOrganizationRole();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_REGULAR_ROLE }));
        setChips({});
        loadOrganizationRole();
    }, []);

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(setRoleType([{ id: 1, name: 'Regular' }]));
        history.push(`${PATH.REG_ROLE}/${roleType}/create`);
    };

    //triggered when edit is pressed
    const editPressed = (id) => {
        dispatch(setRoleType([{ id: 1, name: 'Regular' }]));
        dispatch(setRole(id));
        history.push(`${PATH.REG_ROLE}/${roleType}/${id}/roles`);
    };

    const deletePressed = (id) => {
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteRegularRole(id || 0, page, size, count));
            }
        });
    };

    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setRegularRoleFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);
        if (!chipExists) {
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };
    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };


    const columns = [
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
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id='nameId'
                                label={I18n.t(passedColumns[1].columnLabel)}
                                name={[passedColumns[1].columnName]}
                                options={filterOptions[passedColumns[1].columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setRegularRoleFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys['role.name'], [passedColumns[1].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        },


        {
            name: passedColumns[2].columnName,
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id='descriptionId'
                                name='description'
                                label={I18n.t(passedColumns[2].columnLabel)}
                                options={filterOptions[passedColumns[2].columnName] || []}
                                value={filterState?.[passedColumns[2].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setRegularRoleFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys['role.description'], [passedColumns[2].columnName]);

                                }}
                            />
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id='descriptionId'
                                name='description'
                                label={I18n.t(passedColumns[3].columnLabel)}
                                options={filterOptions[passedColumns[3].columnName] || []}
                                value={filterState?.[passedColumns[3].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setRegularRoleFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys['role.key'], [passedColumns[3].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.EDIT_ROLE) || hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.DELETE_ROLE) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.ADD_ROLE);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { tableData, rowIndex } = tableMeta;
                    let _id = _.get(tableData[rowIndex] || {}, 'id', undefined);
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.EDIT_ROLE)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(_id) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ROLE, ACTION_MAPPING.USER_ROLE.DELETE_ROLE)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(_id) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }


    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChange: onFilterChange,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_REGULAR_ROLE }));
                    setFilterItems({});
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <MUIDataTable
                title={I18n.t('regular_roles')}
                data={regularRoles}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
                tabView={{ tabStatus: true }}
            />

        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_REGULAR_ROLE, url: URL.ROLE.LIST_ALL_NAME_FOR_ROLE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_REGULAR_ROLE }));

        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_REGULAR_ROLE, passedColumns: data })),
    loadOrganizationRole: (data) => dispatch(Actions.listRegularRoles(data)),
    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_REGULAR_ROLE }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_REGULAR_ROLE, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setRegularRoleFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_REGULAR_ROLE, filterState: data })),

    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_REGULAR_ROLE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_REGULAR_ROLE, pagination: data }));
        dispatch(Actions.listRegularRoles());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_REGULAR_ROLE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_REGULAR_ROLE, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListRegularRoleView',
    enableReinitialize: true
})(ListRegularRole));

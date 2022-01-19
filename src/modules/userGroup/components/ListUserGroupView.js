import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { deleteUserGroup } from '../actions';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { history } from '../../../common';
// const { lodashUtils: _ } = utils;
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import * as Actions from '../actions';
import _ from '../../../utils/LodashUtils';

import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, setFilterValuesFromInitialStates, resetFilter } from '../../common/actions';
import { URL } from '../../../common';
import { PATH } from '../../../routes';

const { MUIDataTable, DottedMenu, PickySelect } = Components;

const { AddIcon } = Icons;
function ListUserGroupView(props) {
    const dispatch = useDispatch();

    const { loadUserGroup, setPagination, setChips, setPageProps, setPassedColumnsForTable, getDropdownFilterList, setUserGroupFilter } = props;
    const { tableProps: { [TABLE_IDS.LIST_USER_GROUP]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { listUserGroup: listUserGroupFromReducer } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { data: usersList = [], searchKeys, requestInProgress = false } = listUserGroupFromReducer;
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'description', columnName: 'description', apiParam: 'descriptions', filterBy: 'name' }
    ];

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadUserGroup();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_USER_GROUP }));
        setChips({});
        loadUserGroup();
    }, []);

    //triggered when add button is pressed
    const handleClick = () => {
        history.push(`${PATH.USER_GROUP}/create`);
    };

    const editPressed = (id) => {
        // dispatch(setUserGroup(userGroupId));
        history.push(`${PATH.USER_GROUP}/${id}/details`);
    };
    const deletePressed = (id) => {
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteUserGroup(id || 0, page, size, count));
            }
        });
    };

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: passedColumns[0].columnLabel,
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
                                id='userGroupId'
                                name='userGroupName'
                                label={I18n.t(passedColumns[1].columnLabel)}
                                options={filterOptions[passedColumns[1].columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setUserGroupFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys['usergroup.name'], [passedColumns[1].columnName]);
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
                                id='userGroupDescriptionId'
                                name='userGroupDescription'
                                label={I18n.t(passedColumns[2].columnLabel)}
                                options={filterOptions[passedColumns[2].columnName] || []}
                                value={filterState?.[passedColumns[2].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    dispatch(Actions.setFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } }));
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    if (val.length > 1) {
                                        dispatch(Actions.listJsonDataForUserGroup(val, searchKeys['usergroup.description'], [passedColumns[2].columnName]));
                                    }
                                }}
                            />
                        );

                    }
                }
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.EDIT_USER_GROUP) || hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.DELETE_USER_GROUP) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.ADD_USER_GROUP);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.EDIT_USER_GROUP)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(_id) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.DELETE_USER_GROUP)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(_id) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }
    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setUserGroupFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_USER_GROUP }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
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


    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_USER_GROUP }));
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
                title={I18n.t('user_groups')}
                data={usersList}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
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
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_USER_GROUP, url: URL.USER_GROUP.LIST_USER_GROUP }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_USER_GROUP }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_USER_GROUP, passedColumns: data })),
    loadUserGroup: (data) => dispatch(Actions.listUserGroup(data)),
    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_USER_GROUP, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setUserGroupFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_USER_GROUP, filterState: data })),

    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP }));

        dispatch(setTablePagination({ key: TABLE_IDS.LIST_USER_GROUP, pagination: data }));
        dispatch(Actions.listUserGroup());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_USER_GROUP, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_USER_GROUP, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListUserGroupView',
    enableReinitialize: true
})(ListUserGroupView));

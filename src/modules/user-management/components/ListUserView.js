import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import swlt from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { TABLE_IDS } from '../constants';
import { deleteUser, resetUserCreationForm } from '../actions';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import { getUsers } from '../selectors';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, setFilterValuesFromInitialStates, resetFilter } from '../../common/actions';
import { URL } from '../../../common';
import { PATH } from '../../../routes';

const { MUIDataTable, DottedMenu, PickySelect } = Components;
const { AddIcon } = Icons;

function ListUserView(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    //setting all keys and values to give to api
    const { setPagination, setChips, setPageProps, loadUsers, users: userDetails = {} } = props;
    const { data = {}, requestInProgress = false, searchKeys } = userDetails;
    const { setPassedColumnsForTable, getDropdownFilterList, setListUserFilter } = props;
    const { tableProps: { [TABLE_IDS.LIST_USERS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'first_name', columnName: 'firstName', apiParam: 'firstNames', filterBy: 'name' },
        { columnLabel: 'last_name', columnName: 'lastName', apiParam: 'lastNames', filterBy: 'name' },
        { columnLabel: 'user_name', columnName: 'username', apiParam: 'usernames', filterBy: 'name' },
        { columnLabel: 'email', columnName: 'emails', apiParam: 'emails', filterBy: 'name' },
        { columnLabel: 'mobile', columnName: 'mobiles', apiParam: 'mobiles', filterBy: 'name' },
        { columnLabel: 'roles', columnName: 'roleNames', apiParam: 'roleNames', filterBy: 'name' },
        { columnLabel: 'organizations', columnName: 'organizationNames', apiParam: 'orgNames', filterBy: 'name' },
        { columnLabel: 'user_type', columnName: 'userTypeResponse', apiParam: 'userTypeNames', filterBy: 'name' }
    ];
    // API Specific params
    // const filter = true;
    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadUsers();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_USERS }));
        setChips({});
        loadUsers();
    }, []);

    // useEffect(() => {
    //     setFilterItems(tableFilterDestructuringArray(filterState));

    // }, [filterState]);

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(resetUserCreationForm());
        history.push(`${PATH.USER}/create`);
    };

    //function for edit
    const editPressed = (id) => {
        history.push(`${PATH.USER}/${id}/details`);
    };


    //function for delete
    const deletePressed = (id) => {
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteUser(id || 0, page, size, count));
            }
        });
    };

    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setListUserFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_USERS }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
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
                                label={I18n.t(passedColumns[1].columnLabel)}
                                id='nameId'
                                name={I18n.t(passedColumns[1].columnLabel)}
                                options={filterOptions[passedColumns[1].columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys.firstName, [passedColumns[1].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        }, {
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
                                label={I18n.t(passedColumns[2].columnLabel)}
                                id='name'
                                name='id'
                                options={filterOptions[passedColumns[2].columnName] || []}
                                value={filterState?.[passedColumns[2].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys.lastName, [passedColumns[2].columnName]);
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
                                label={I18n.t(passedColumns[3].columnLabel)}
                                id='name1'
                                name='username'
                                options={filterOptions[passedColumns[3].columnName] || []}
                                value={filterState?.[passedColumns[3].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys.username, [passedColumns[3].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        },
        {
            name: 'contact.email',
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                label={I18n.t(passedColumns[4].columnLabel)}
                                id='name2'
                                name='email'
                                options={filterOptions[passedColumns[4].columnName] || []}
                                value={filterState?.[passedColumns[4].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys.email, [passedColumns[4].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        }, {
            name: 'contact.mobile',
            label: I18n.t(passedColumns[5].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                label={I18n.t(passedColumns[5].columnLabel)}
                                id='name3'
                                name='mobile'
                                options={filterOptions[passedColumns[5].columnName] || []}
                                value={filterState?.[passedColumns[5].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys.mobile, [passedColumns[5].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[6].columnName,
            label: I18n.t(passedColumns[6].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                label={I18n.t(passedColumns[6].columnLabel)}
                                id='name4'
                                name='roleName'
                                options={filterOptions[passedColumns[6].columnName] || []}
                                value={filterState?.[passedColumns[6].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, 'role.name', [passedColumns[6].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                label={I18n.t(passedColumns[7].columnLabel)}
                                id='name'
                                name='id'
                                options={filterOptions[passedColumns[7].columnName] || []}
                                value={filterState?.[passedColumns[7].apiParam]?.value}
                                multiple={true}
                                onChange={value => {
                                    setListUserFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, 'organization.name', [passedColumns[7].columnName]);
                                }}
                            />
                        );
                    }
                }
            }
        },
        {
            name: 'userTypeResponse.name',
            label: I18n.t(passedColumns[8].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('user_type')]}</Typography>
                                <PickySelect
                                    id='userType'
                                    name='userType'
                                    options={filterOptions[passedColumns[8].columnName] || []}
                                    value={filterState?.[passedColumns[8].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setListUserFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, 'userTypeResponse', [passedColumns[8].columnName]);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER) || hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.DELETE_USER) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ADD_USER);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                filter: false,
                ...TABLE_STICKY_ACTIONS,
                customBodyRender: (value, tableMeta) => {
                    let { tableData, rowIndex } = tableMeta;
                    let _id = _.get(tableData[rowIndex] || {}, 'id', undefined);
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.EDIT_USER)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(_id) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.DELETE_USER)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(_id) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }

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
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_USERS }));
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
                title={I18n.t('users')}
                data={data.content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    users: getUsers,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_USERS, url: URL.USER_MANAGEMENT.LIST_USER }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_USERS }));
        }
    },
    loadUsers: (data) => dispatch(Actions.listUser(data)),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_USERS, passedColumns: data })),
    resetTableFilterList: ({ organizationId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USERS }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_USERS, additionalFilters: { unassignedUsersOnly: false, member: false, organizationId } }));
    },
    setListUserFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_USERS, filterState: data })),

    // processSubscriptionRequest: (data) => dispatch(Actions.processSubscriptionRequest(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_USERS }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_USERS, pagination: data }));
        dispatch(Actions.listUser());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_USERS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_USERS, pagination: data }))
});

// export default ListUserView;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListUserView',
    enableReinitialize: true
})(ListUserView));

import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import swlt from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import _ from '../../../utils/LodashUtils';
import * as Actions from '../actions';
import { PATH } from '../../../routes';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getOrganizationTypes } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';

const { MUIDataTable, DottedMenu, PickySelect } = Components;
const { AddIcon } = Icons;

function OrganizationTypeList(props) {
    const history = useHistory();
    const dispatch = useDispatch();


    const { listOrganizationType: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setOrgTypeFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadOrganizationTypes } = props;
    const { tableProps: { [TABLE_IDS.LIST_ORGANIZATION_TYPE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const flagArray = [{ id: '1', name: 'true' }, { id: '2', name: 'false' }];

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadOrganizationTypes();
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'is_lsgi_type', columnName: 'isLsgiType', apiParam: 'lsgiTypes', filterBy: 'name' }
    ];
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE }));
        setChips({});
        loadOrganizationTypes();
    }, []);

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(Actions.resetOrganizationTypeForm());
        history.push(`${PATH.BASIC_CONFIG_ORG_TYPE}/create`);
    };

    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.BASIC_CONFIG_ORG_TYPE}/${id}`);
    };
    //function for delete
    const deletePressed = (rowData) => {
        let id = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(Actions.deleteOrganizationType(id || 0, page, size, count));
            }
        });
    };

    const columns = [
        {
            name: 'id',
            label: 'id',
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
                                name={I18n.t(passedColumns[1]?.columnLabel)}
                                options={filterOptions[passedColumns[1]?.columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setOrgTypeFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys[0], [passedColumns[1].columnName]);
                                }}
                            />
                        );

                    }
                }
            }
        },
        {
            name: 'isLsgiType',
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                customBodyRender: (val) => {
                    return val === true ? 'true' : 'false';

                },
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (

                            <PickySelect
                                label={I18n.t('IsLsgiType')}
                                id='nameId'
                                name={I18n.t(passedColumns[2]?.columnLabel)}
                                options={flagArray}
                                value={filterState?.[passedColumns[2].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setOrgTypeFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys[0], [passedColumns[2].columnName]);
                                }}
                            />
                        );

                    }
                }
            }

        }

    ];
    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setOrgTypeFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.EDIT_ORGANIZATION_TYPE) || hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.DELETE_ORGANIZATION_TYPE) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.ADD_ORGANIZATION_TYPE);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                filter: false,
                ...TABLE_STICKY_ACTIONS,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.EDIT_ORGANIZATION_TYPE)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.DELETE_ORGANIZATION_TYPE)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
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
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE }));
                    break;
                default:
                    break;
            }
        }
    };


    return (
        <div>
            <MUIDataTable
                title={I18n.t('organization_type')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listOrganizationType: getOrganizationTypes,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ORGANIZATION_TYPE, url: URL.ORGANIZATION_TYPE.LIST_ORGANIZATION_TYPE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, passedColumns: data })),
    setOrgTypeFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, filterState: data }));
    },
    loadOrganizationTypes: (data) => dispatch(Actions.listOrganizationType(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, pagination: data }));
        dispatch(Actions.listOrganizationType());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTypeList);

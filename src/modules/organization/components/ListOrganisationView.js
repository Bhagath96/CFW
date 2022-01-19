import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Swal from 'sweetalert2';
import { createStructuredSelector } from 'reselect';

import { deleteOrganization } from '../actions';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { history } from '../../../common';
import _ from '../../../utils/LodashUtils';
import { Components, Icons, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import i18n from '../../../i18n';
import * as Actions from '../actions';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, resetFormChange, setTableFilterState, setPassedColumns, setFilterValuesFromInitialStates, resetFilter } from '../../common/actions';
import { URL } from '../../../common';
import { PATH } from '../../../routes';


const { MUIDataTable, DottedMenu, PickySelect } = Components;
const { AddIcon } = Icons;

function ListOrganizationView(props) {
    const dispatch = useDispatch();
    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { listOrganisation: { data: organizationList, searchKeys, requestInProgress = false } = {} } = initialValues;

    const { setPagination, setChips, setPageProps, loadOrganization, setPassedColumnsForTabel, getDropdownFilterList, setOrganizationFilter } = props;
    const { tableProps: { [TABLE_IDS.LIST_ORGANIZATION]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'organizations', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'parent_organization', columnName: 'parentOrganization.name', apiParam: 'parentOrgNames', filterBy: 'name' },
        { columnLabel: 'organization_type', columnName: 'organizationType.name', apiParam: 'orgTypeNames', filterBy: 'name' }
    ];
    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadOrganization();
    };

    useEffect(() => {
        setPassedColumnsForTabel(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ORGANIZATION }));
        setChips({});
        loadOrganization();
    }, []);


    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setOrganizationFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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

    const editPressed = (rowData) => {
        // dispatch(Actions.clearOrganizationType());
        let id = rowData[0];
        history.push(`${PATH.ORGANIZATION}/${id}/basic`);
    };
    const deletePressed = (organization) => {
        let id = organization[0];
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteOrganization(id || 0, page, size, count));
            }
        });
    };

    //triggered when add button is pressed
    const handleClick = () => {
        history.push(`${PATH.ORGANIZATION}/create`);
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
                            <PickySelect
                                id='name'
                                name='id'
                                label={I18n.t(passedColumns[1].columnLabel)}
                                options={filterOptions[passedColumns[1].columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                onChange={value => {
                                    setOrganizationFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    if (val.length > 0) {
                                        getDropdownFilterList(val, searchKeys['organization.name'], 'organization.name');
                                    }
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: 'organizationType.name',
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[3].columnName}
                                label={I18n.t(passedColumns[3].columnLabel)}
                                name={passedColumns[3].columnName}
                                options={filterOptions[passedColumns[3].columnName] || []}
                                value={filterState?.[passedColumns[3].apiParam]?.value}
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                onChange={value => {
                                    setOrganizationFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    if (val.length > 0) {
                                        getDropdownFilterList(val, searchKeys['organizationType.name'], 'organization.name');
                                    }
                                }}

                            />
                        );
                    }
                }
            }
        }
    ];

    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION) || hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.DELETE_ORGANIZATION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ADD_ORGANIZATION);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.EDIT_ORGANIZATION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.DELETE_ORGANIZATION)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columProps.push(actions);
    }
    const onFilterChange = (chipValue, chipList) => {
        // setSelectedUsers([]);
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ORGANIZATION }));
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
            { handleClick: handleClick, icon: < AddIcon />, toolTip: i18n.t('add') }
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ORGANIZATION }));
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
                title={i18n.t('organizations')}
                data={organizationList}
                columns={columProps}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    // users: getOrganizationList,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ORGANIZATION, url: URL.ORGANIZATION.LIST_ORGANISATION }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ORGANIZATION }));
        }
    },
    setPassedColumnsForTabel: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ORGANIZATION, passedColumns: data })),
    resetForm: () => dispatch(resetFormChange()),
    resetTableFilterList: ({ organizationId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ORGANIZATION, additionalFilters: { unassignedUsersOnly: false, member: false, organizationId } }));
    },
    loadOrganization: (data) => dispatch(Actions.listOrganization(data)),
    setOrganizationFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ORGANIZATION, filterState: data })),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ORGANIZATION, pagination: data }));
        // dispatch()
        dispatch(Actions.listOrganization());
    },
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ORGANIZATION, additionalFilters: data }));
        dispatch(Actions.listOrganization());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ORGANIZATION, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ORGANIZATION, pagination: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListOrganizationView',
    enableReinitialize: true
})(ListOrganizationView));


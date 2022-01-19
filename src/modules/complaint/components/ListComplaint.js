import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';
import utils from '../../../utils';
import { fetchComplaintDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS, BASE64_APPEND } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getComplaintList } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { convertToLocalDate } from '../../../utils/DateUtils';
import isBase64 from 'is-base64';

import { Typography } from '@material-ui/core';


const { MUIDataTable, PickySelect, Dialog: DialogCustom } = Components;
const { lodashUtils: _ } = utils;

function ListComplaint(props) {

    const dispatch = useDispatch();
    const {
        listComplaints: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setComplaintFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadComplaints } = props;
    const { tableProps: { [TABLE_IDS.LIST_COMPLAINT]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const [selectedValue, setSelectedValueForPopup] = React.useState('');
    // const [isOpenAssignServiceWorker, setIsOpenAssignServiceWorker] = React.useState(false);
    // const descriptionElementRef = React.useRef(null);
    // const [modalOrganization, setModalOrganization] = React.useState(null);
    // const [modalServiceProvider, setModalServiceProvider] = React.useState(null);
    // const [modalSupervisor, setModalSupervisor] = React.useState(null);
    // const [modalWard, setModalWard] = React.useState(null);
    // const [modalComplaintId, setModalComplaintId] = React.useState(null);

    // useEffect(() => {
    //     if (isOpenAssignServiceWorker) {
    //         const { current: descriptionElement } = descriptionElementRef;
    //         if (descriptionElement !== null) {
    //             descriptionElement.focus();
    //         }
    //     }
    // }, [isOpenAssignServiceWorker]);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'label', columnName: 'complaintLabel', apiParam: '', filterBy: 'name', searchKey: '' },
        { columnLabel: 'picture', columnName: 'photo', apiParam: '', filterBy: 'name' },
        { columnLabel: 'remarks', columnName: 'remarks', apiParam: '', filterBy: 'name', searchKey: '' },
        { columnLabel: 'location', columnName: 'location', apiParam: 'locations', filterBy: 'name', searchKey: '' },
        { columnLabel: 'reported_by', columnName: 'reportedBy.name', apiParam: 'reportedBy', filterBy: 'name', searchKey: '' },
        { columnLabel: 'reported_date', columnName: 'reportedDate', apiParam: 'reportedDate', filterBy: 'name', searchKey: '' },
        { columnLabel: 'child_mode', columnName: 'childMode', apiParam: 'childMode', filterBy: 'name', searchKey: '' }
    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadComplaints();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_COMPLAINT }));
        setChips({});
        loadComplaints();
    }, []);

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t([passedColumns[0].columnLabel]),
            options: {
                display: 'excluded',
                filter: false
            }
        },

        {
            name: passedColumns[1].columnName,
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {
                filter: false,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[1].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setComplaintFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[1].searchKey}`), [passedColumns[1].columnName]);
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
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div>
                        {isBase64(value) ? <img
                            style={{ width: 100, height: 100, cursor: 'pointer' }}
                            src={`${BASE64_APPEND}${value}`} alt=''
                            onClick={() => setSelectedValueForPopup(`${BASE64_APPEND}${value}`)}
                        /> : <p></p>}
                    </div>;
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {

                filter: false,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[3].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setComplaintFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[3].searchKey}`), [passedColumns[3].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t([passedColumns[4].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div style={{ cursor: 'pointer' }} onClick={() => setSelectedValueForPopup(value)}>
                        {
                            <p>{value.formattedAddress}</p>
                        }
                    </div>;
                }
            }

        },
        {
            name: passedColumns[5].columnName,
            label: I18n.t([passedColumns[5].columnLabel]),
            options: {

                filter: false,
                filterType: 'custom'
            }
        },
        {
            name: passedColumns[6].columnName,
            label: I18n.t([passedColumns[6].columnLabel]),
            options: {
                filter: false,
                filterType: 'custom',
                customBodyRender: (value) => convertToLocalDate(value)
            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t([passedColumns[7].columnLabel]),
            options: {

                filter: false,
                filterType: 'custom',
                customBodyRender: (value) => {
                    return <div>
                        {
                            <p>{value ? I18n.t('true') : I18n.t('false')}</p>
                        }
                    </div>;
                }
            }
        }

    ];

    // const openServiceWorkerModal = ({ organization, complaintId, ward }) => {
    //     let wardId = _.get(ward, 'id', null);
    //     dispatch(commonActions.getAllServiceProviderUnderOrg({ organizationId: _.get(organization, 'id', null), wardId }));
    //     setIsOpenAssignServiceWorker(true);
    //     setModalOrganization(organization);
    //     setModalComplaintId(complaintId);
    //     setModalServiceProvider({});
    //     setModalWard(ward);
    //     setModalSupervisor({});
    //     props.change('ward', ward || null);

    //     // props.change('ward', getEmptyPicky());
    //     props.change('serviceProvider', getEmptyPicky());
    //     props.change('superVisor', getEmptyPicky());
    //     props.change('serviceWorker', getEmptyPicky());
    // };

    // const showActionMenu = false;

    // if (showActionMenu) {
    //     let actions = {
    //         name: 'Actions',
    //         label: I18n.t('actions'),
    //         options: {
    //             ...TABLE_STICKY_ACTIONS,
    //             filter: false,
    //             customBodyRender: (value, tableMeta) => {
    //                 let menuActions = [];
    //                 let { rowData } = tableMeta;
    //                 // if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.SHOW_HISTORY)) {
    //                 let complaintId = getTableData(rowData, columns, 'id');
    //                 let organization = getTableData(rowData, columns, 'organization');
    //                 let organizationId = _.get(organization, 'id', null);
    //                 let serviceProviderId = _.get(getTableData(rowData, columns, 'serviceProvider'), 'id', null);
    //                 let serviceWorkerId = _.get(getTableData(rowData, columns, 'serviceWorker'), 'id', null);
    //                 let supervisorId = _.get(getTableData(rowData, columns, 'supervisor'), 'id', null);
    //                 let ward = getTableData(rowData, columns, 'ward');
    //                 let wardId = _.get(ward, 'id', null);
    //                 if (!serviceProviderId && !serviceWorkerId && !supervisorId && organizationId && complaintId && wardId) {
    //                     menuActions.push({ name: I18n.t('assignServiceWorker'), fn: () => openServiceWorkerModal({ organization, complaintId, ward }) });
    //                 }
    //                 // }
    //                 return <DottedMenu options={menuActions} />;
    //             }
    //         }
    //     };
    //     columns.push(actions);
    // }
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setComplaintFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);


        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT }));
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };
    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };
    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        filter: false,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_COMPLAINT }));

                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('complaints')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
            <DialogCustom
                title={selectedValue.toString().includes(BASE64_APPEND) ? I18n.t('photo') : I18n.t('')}
                body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                    {selectedValue.toString().includes(BASE64_APPEND) ? <div style={{ textAlign: 'center' }}>
                        <img
                            style={{ width: 360, maxWidth: 360, height: 640 }}
                            src={selectedValue} alt={''}
                        />
                    </div> : <p>{selectedValue}</p>
                    }
                </div>}
                onCancel={() => setSelectedValueForPopup(false)}
                cancelText={I18n.t('ok')}
                isOPen={selectedValue}
            />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    listComplaints: getComplaintList,
    tableProps: getTableProps
    // modalProps: getAssignServiceWorker
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_COMPLAINT, url: URL.COMPLAINT.LIST_COMPLAINT }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_COMPLAINT, passedColumns: data })),
    setComplaintFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_COMPLAINT, filterState: data }));
    },
    loadComplaints: (data) => dispatch(fetchComplaintDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_COMPLAINT }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_COMPLAINT, pagination: data }));
        dispatch(fetchComplaintDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_COMPLAINT, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_COMPLAINT, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListComplaint',
    enableReinitialize: true
})(ListComplaint));

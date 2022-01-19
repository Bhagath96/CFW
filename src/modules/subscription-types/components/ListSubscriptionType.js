import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import { fetchSubscriptionTypeDetails, deleteSubscriptionTypeData, clearSubscriptionTypeReducer } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getSubscriptionTypes } from '../selectors';
import { URL } from '../../../common';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setPassedColumns, setFilterValuesFromInitialStates } from '../../common/actions';
import { PATH } from '../../../routes';
import isBase64 from 'is-base64';
import { BASE64_APPEND } from '../../complaint/constant';
import _ from 'lodash';

const { MUIDataTable, DottedMenu } = Components;
const { AddIcon } = Icons;


function ListSubscriptionType(props) {

    const dispatch = useDispatch();
    const { listSubscriptionType: { requestInProgress = false, data: { content = [] } = {} } } = props;
    const { setPassedColumnsForTable, setPagination, setPageProps, loadSubscriptionTypes } = props;
    const { tableProps: { [TABLE_IDS.LIST_SUBSCRIPTION_TYPE]: { pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);


    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearSubscriptionTypeReducer());
        history.push(`${PATH.SUBSCRIPTION}/create`);
    };


    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.SUBSCRIPTION}/${id}`);
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
                dispatch(deleteSubscriptionTypeData(id || 0, size, page));
            }
        });
    };

    const createPost = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.SUBSCRIPTION}/${id}/posts`);
    };

    const associateRoles = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.SUBSCRIPTION}/${id}/associate-roles`);
    };

    const associateUserGroups = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.SUBSCRIPTION}/${id}/associate-user-groups`);
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'icon', columnName: 'icon', apiParam: 'icon', filterBy: 'name' },
        { columnLabel: 'assigned_roles', columnName: 'roles', apiParam: 'roles', filterBy: 'name' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        loadSubscriptionTypes();
    }, []);

    const columns = [
        {
            name: 'id',
            label: I18n.t([passedColumns[0].columnLabel]),
            options: {
                filter: false
            }
        },
        {
            name: 'name',
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {
                filter: false
            }

        },
        {
            name: 'icon',
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div>
                        {value && isBase64(value) ? <img
                            style={{ width: 50, height: 50 }}
                            src={`${BASE64_APPEND}${value}`} alt=''
                        /> : <p></p>}
                    </div>;
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {
                filter: false
            }

        }
    ];
    let showActionMenu = true, showAddIcon = true;
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData, tableData, rowIndex } = tableMeta;
                    let updatable = _.get(tableData[rowIndex] || {}, 'updatable', false);
                    let deletable = _.get(tableData[rowIndex] || {}, 'deletable', false);

                    let menuActions = [];
                    if (updatable) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (deletable) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    menuActions.push({ name: I18n.t('associate_roles'), fn: () => associateRoles(rowData) });
                    menuActions.push({ name: I18n.t('associate_user_groups'), fn: () => associateUserGroups(rowData) });
                    menuActions.push({ name: I18n.t('create_posts'), fn: () => createPost(rowData) });

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
        filter: false,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('subscription_topics')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listSubscriptionType: getSubscriptionTypes,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, url: URL.SUBSCRIPTION_TYPE.LIST_SUBSCRIPTION_TYPE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, passedColumns: data })),
    loadSubscriptionTypes: (data) => dispatch(fetchSubscriptionTypeDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, pagination: data }));
        dispatch(fetchSubscriptionTypeDetails());
    },
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListSubscriptionType);


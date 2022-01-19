import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import { listHomePosts, clearSubscriptionTypeReducer, deleteHomePostData } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { getTableProps } from '../../common/selectors';
import { getHomePosts } from '../selectors';
import { URL } from '../../../common';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setPassedColumns, setFilterValuesFromInitialStates } from '../../common/actions';
import { PATH } from '../../../routes';
import { useParams } from 'react-router';

const { MUIDataTable, DottedMenu, Dialog: DialogCustom } = Components;
const { AddIcon } = Icons;


function ListHomePosts(props) {

    const { id: subscriptionId = null } = useParams();
    const dispatch = useDispatch();
    const { listHomePost: { requestInProgress, data: content = [] } } = props;
    const { setPassedColumnsForTable, setPagination, setPageProps, loadHomePosts } = props;
    const { tableProps: { [TABLE_IDS.LIST_HOME_POST]: { pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const [selectedValue, setSelectedValueForPopup] = React.useState('');


    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearSubscriptionTypeReducer());
        history.push(`${PATH.SUBSCRIPTION}/${subscriptionId}/posts/create`);
    };


    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.SUBSCRIPTION}/${subscriptionId}/posts/${id}`);
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
                dispatch(deleteHomePostData({ id: subscriptionId, postId: id }));
            }
        });
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'title', columnName: 'title', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'body', columnName: 'body', apiParam: 'icon', filterBy: 'name' },
        { columnLabel: 'photo', columnName: 'photo', apiParam: 'icon', filterBy: 'name' },
        { columnLabel: 'youtube_url', columnName: 'youtubeId', apiParam: 'icon', filterBy: 'name' },
        { columnLabel: 'assigned_roles', columnName: 'roles', apiParam: 'roles', filterBy: 'name' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        loadHomePosts(subscriptionId);
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
            name: passedColumns[1].columnName,
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {
                filter: false
            }

        },
        {
            name: 'body',
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {
                filter: false
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div>
                        {value ? <img
                            style={{ width: 100, height: 100, cursor: 'pointer' }}
                            src={`${value}`} alt=''
                            onClick={() => setSelectedValueForPopup(`${value}`)}
                        /> : <p></p>}
                    </div>;
                }
            }

        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t([passedColumns[4].columnLabel]),
            options: {
                filter: false
            }

        },
        {
            name: passedColumns[5].columnName,
            label: I18n.t([passedColumns[5].columnLabel]),
            options: {
                filter: false
            }

        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.EDIT_STATE) || hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.DELETE_STATE) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.EDIT_STATE) || hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.DELETE_STATE) || false;
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
                    if (hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.EDIT_STATE)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.DELETE_STATE)) {
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
        filter: false,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page }, subscriptionId);
                    break;
                case 'changeRowsPerPage':
                    setPageProps({
                        page: 0, size: tableState.rowsPerPage
                    }, subscriptionId);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('posts')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
            <DialogCustom
                title={I18n.t('photo')}
                body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            style={{ width: 360, maxWidth: 360, height: 640 }}
                            src={selectedValue} alt={''}
                        />
                    </div>
                </div>}
                onCancel={() => setSelectedValueForPopup(false)}
                cancelText={I18n.t('ok')}
                isOPen={selectedValue}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listHomePost: getHomePosts,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_HOME_POST, url: URL.SUBSCRIPTION_TYPE.LIST_HOME_POST }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_HOME_POST }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_HOME_POST, passedColumns: data })),
    loadHomePosts: (data) => dispatch(listHomePosts(data)),
    setPageProps: (pagination, data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_HOME_POST }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_HOME_POST, pagination }));
        dispatch(listHomePosts(data));
    },
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_HOME_POST, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListHomePosts);


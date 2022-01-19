import { takeLatest, fork, all, take, call, delay, select, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';

import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { formatCheckBoxesForAPI, getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getRoles } from './selectors';
import _ from '../../utils/LodashUtils';
import { getDefaultLanguage } from '../common/selectors';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList, setSelectedIds } from '../common/actions';
import * as Actions from './actions';

function* listRegularRoles() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_REGULAR_ROLE_REQUEST, ActionTypes.LIST_REGULAR_ROLE_SUCCESS, ActionTypes.LIST_REGULAR_ROLE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_REGULAR_ROLE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_REGULAR_ROLE);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listRegularRole, { params: { ...tableProps, langId }, types });
    const roleAction = yield take([ActionTypes.LIST_REGULAR_ROLE_SUCCESS, ActionTypes.LIST_REGULAR_ROLE_FAILURE]);
    let regularRoleTableData = getPayloadData(roleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(regularRoleTableData, 'content', []));
    if (roleAction.type === ActionTypes.LIST_REGULAR_ROLE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_REGULAR_ROLE, getPayloadData(roleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_REGULAR_ROLE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_REGULAR_ROLE, filterOptionsList: allFilterValues }));
    }
}

function* listOrganizationRoles() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_ORGANISATION_ROLE_REQUEST, ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS, ActionTypes.LIST_ORGANISATION_ROLE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ORGANIZATIONAL_ROLE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ORGANIZATIONAL_ROLE);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listOrganizationRole, { params: { ...tableProps, langId }, types });
    const organizationRoleAction = yield take([ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS, ActionTypes.LIST_ORGANISATION_ROLE_FAILURE]);
    let tableData = getPayloadData(organizationRoleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(tableData, 'content', []));
    if (organizationRoleAction.type === ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, getPayloadData(organizationRoleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, filterOptionsList: allFilterValues }));
    }
}

//to delete an organizationalRole
function* deleteOrganizationRoles(action) {
    const roleId = action.payload.id;
    yield fork(saga.handleAPIRequest, API.deleteOrganizationalRole, roleId);
    const deleteAction = yield take([ActionTypes.DELETE_ORGANIZATIONAL_ROLE_SUCCESS, ActionTypes.DELETE_REGULAR_ROLE_FAILURE]);
    if (deleteAction.type === ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS) {
        yield call(successNotify, I18n.t('delete_success', { type: I18n.t('organization_roles') }));
        yield call(listOrganizationRoles);
    }
}

//to delete regular role
function* deleteRegularRoles(action) {
    const roleId = action.payload.id;
    yield fork(saga.handleAPIRequest, API.deleteRegularRole, roleId);
    yield take(ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('regular_roles') }));
    yield call(listRegularRoles);
}

//to add role
function* addRole(action) {
    yield fork(saga.handleAPIRequest, API.addRole, action.payload.data);
    const responce = yield take(ActionTypes.ADD_ROLE_SUCCESS);
    const { payload } = responce;
    const { data } = payload;
    const roleId = data.data.id ? data.data.id : null;
    const roleTypeId = action.payload.roleType;
    if (+roleTypeId === 1) {
        yield call(history.push, `${PATH.REG_ROLE}/1/${roleId}/roles`);

    } else if (+roleTypeId === 0) {
        yield call(history.push, `${PATH.ORG_ROLE}/0/${roleId}/roles`);

    }
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('roles') }));
}
//to get the list of permission controllers
function* getListPermissionController() {
    yield fork(saga.handleAPIRequest, API.getControllerPermissions);
}
//to get the list of permission controllers
function* getListPermissionControllerByRoleId(action) {
    yield fork(saga.handleAPIRequest, API.getControllerPermissionsWithRoleId, action.payload.id);
}
function* updateRole(action) {
    const id = action.payload.id;
    const data = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateRole, id, data);
    yield take(ActionTypes.UPDATE_ROLE_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('roles') }));
    yield delay(1200);
}
//fn to send action ids
function* sendActionIds(action) {
    yield fork(saga.handleAPIRequest, API.sendActionIds, action.payload.data);
    yield take(ActionTypes.SEND_ACTION_IDS_SUCCESS);
    yield call(successNotify, I18n.t('add_permission'));
    yield delay(1200);

}
//getting role permission for editting
function* getRolePermissionForEdit(action) {
    yield fork(saga.handleAPIRequest, API.getRolespermissionsForEdit, action.payload);
}
//send permission for edit
function* sendPermissionForEdit(action) {
    yield fork(saga.handleAPIRequest, API.sendPermissionForEdit, action.payload);
    yield take(ActionTypes.SEND_PERMISSION_FOR_EDIT_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('permission') }));
    yield delay(1200);
}
//function for getting user based on role
function* getRUsersBasedOnRole(action) {
    yield fork(saga.handleAPIRequest, API.getUserBasedOnRoleId, action.payload.id);
}

function* updateUsersInRole(action) {
    let { roleId, users } = action.payload.data;
    let roles = yield select(getRoles);
    let { assignUsersList: { data: apiResponse } } = roles;
    let requestBody = formatCheckBoxesForAPI(users, apiResponse);
    yield fork(saga.handleAPIRequest, API.updateUsersInRole, { roleId, requestBody });
    yield take(ActionTypes.UPDATE_USERS_IN_ROLES_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('users') }));
}
function* getRoleById(action) {
    yield call(saga.handleAPIRequest, API.getRoleById, action.payload.id);
}

function* fetchResourceActions(action) {
    yield fork(saga.handleAPIRequest, API.fetchResourceActions, action.payload.data);
}

function* saveResourceActions(action) {
    let { resourcePermissionId, resourceId, roleId, actions = [{ 0: false }] } = action.payload.data;
    let actionId = [];
    _.forEach(actions, function (value, key) {
        if (actions[key]) {
            actionId.push(parseInt(key));
        }
    });
    if (resourcePermissionId !== null) {
        yield fork(saga.handleAPIRequest, API.updateResourceActions, { resourcePermissionId, resourceId, roleId, actionIds: _.sum(actionId) });
        yield take(ActionTypes.UPDATE_RESOURCE_ACTIONS_SUCCESS);
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('permission') }));
    } else {
        yield fork(saga.handleAPIRequest, API.saveResourceActions, { resourceId, roleId, actionIds: _.sum(actionId) });
        yield take(ActionTypes.SAVE_RESOURCE_ACTIONS_SUCCESS);
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('permission') }));
    }
}

function* fetchAssignRoleToUser() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER);

    let { additionalFilters, passedColumns } = additionalProps;
    let { roleId, ...restAdditionalInfo } = additionalFilters;
    yield fork(saga.handleAPIRequest, API.fetchAssignRole, { params: { ...tableProps, ...restAdditionalInfo, langId }, roleId });
    const roleAssignUserListAction = yield take([ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_FAILURE]);
    let userAssignOrgTableData = roleAssignUserListAction?.payload?.data?.data?.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userAssignOrgTableData);

    if (roleAssignUserListAction.type === ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, getPayloadData(roleAssignUserListAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, filterOptionsList: allFilterValues }));
    }
}

function* submitAssignRole(action) {
    let { roleId, assignRoleObj } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.submitAssignRole, {
        roleId,
        requestBody: assignRoleObj
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, selectedIds: [] }));
        yield put(Actions.fetchAssignRoleToUser());
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
    }
}

export default function* roleSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_REGULAR_ROLE, listRegularRoles),
        takeLatest(ActionTypes.LIST_ORGANISATION_ROLE, listOrganizationRoles),
        takeLatest(ActionTypes.DELETE_ORGANIZATIONAL_ROLE, deleteOrganizationRoles),
        takeLatest(ActionTypes.DELETE_REGULAR_ROLE, deleteRegularRoles),
        takeLatest(ActionTypes.ADD_ROLE, addRole),
        takeLatest(ActionTypes.LIST_PERMISSION_CONTROLLER, getListPermissionController),
        takeLatest(ActionTypes.LIST_PERMISSION_CONTROLLER_BY_ROLE_ID, getListPermissionControllerByRoleId),
        takeLatest(ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT, getRolePermissionForEdit),
        takeLatest(ActionTypes.SEND_PERMISSION_FOR_EDIT, sendPermissionForEdit),
        takeLatest(ActionTypes.GET_USERS_BASED_ON_ROLE_ID, getRUsersBasedOnRole),
        takeLatest(ActionTypes.SEND_ACTION_IDS, sendActionIds),
        takeLatest(ActionTypes.SET_ROLE, getRoleById),
        takeLatest(ActionTypes.UPDATE_ROLE, updateRole),
        takeLatest(ActionTypes.UPDATE_USERS_IN_ROLES, updateUsersInRole),
        takeLatest(ActionTypes.FETCH_RESOURCE_ACTIONS, fetchResourceActions),
        takeLatest(ActionTypes.SAVE_RESOURCE_ACTIONS, saveResourceActions),
        takeLatest(ActionTypes.FETCH_ASSIGN_ROLE_TO_USER, fetchAssignRoleToUser),
        takeLatest(ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER, submitAssignRole),
        takeLatest(ActionTypes.SAVE_RESOURCE_ACTIONS, saveResourceActions)
    ]);
}

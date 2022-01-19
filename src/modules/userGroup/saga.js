import { takeLatest, all, call, fork, take, delay, select, put } from 'redux-saga/effects';

import utils from '../../utils';
import { saga, history } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import * as Actions from './actions';
import { getUserGroups } from './selectors';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { getAllFilterOptionValues } from '../../utils/ApiUtils';
import { setInitialFilterList, setTableDropdownFilterList, setSelectedIds } from '../common/actions';

const { lodashUtils: _, notifyUtils: { successNotify }, apiUtils: { formatCheckBoxesForAPI, getPayloadData } } = utils;

function* listUserGroup() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_USER_GROUP);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_USER_GROUP);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listUserGroup, { params: { ...tableProps, langId } });
    const userGroupAction = yield take([ActionTypes.LIST_USER_GROUP_SUCCESS, ActionTypes.LIST_USER_GROUP_FAILED]);
    let userTableData = userGroupAction.payload.data.data.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userTableData);
    if (userGroupAction.type === ActionTypes.LIST_USER_GROUP_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_USER_GROUP, getPayloadData(userGroupAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_USER_GROUP, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP, filterOptionsList: allFilterValues }));

    }
}

function* saveUserGroup(action) {
    let tempData = _.get(action, 'payload.data', {});
    _.set(tempData, 'title', _.get(tempData, 'name', {}));
    yield fork(saga.handleAPIRequest, API.saveUserGroup, tempData);
    yield take(ActionTypes.SAVE_USER_GROUP_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('user_group') }));
    yield delay(200);
    yield call(history.push, PATH.USER_GROUP);
}

function* updateUserGroup(action) {
    let userGroupId = _.get(action, 'payload.data.id', '');
    yield fork(saga.handleAPIRequest, API.updateUserGroup, { userGroupId, data: action.payload.data });
    yield take(ActionTypes.UPDATE_USER_GROUP_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('user_group') }));
}

function* deleteUserGroup(action) {
    yield fork(saga.handleAPIRequest, API.deleteUserGroup, action.payload.data);
    yield take(ActionTypes.DELETE_USER_GROUP_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('user_group') }));

    yield call(listUserGroup, {
        payload: {
            size: action.payload.size,
            page: action.payload.page,
            count: action.payload.count
        }
    }
    );
}
function* getUserGroupByID(action) {
    yield call(saga.handleAPIRequest, API.getUserGroupByID, action.payload.data);
}

function* fetchUsersByUserGroup(action) {
    yield call(saga.handleAPIRequest, API.fetchUsersByUserGroup, action.payload.data);
}

function* updateUsersInUserGroup(action) {
    let { userGroupId, users } = action.payload.data;
    let userGroups = yield select(getUserGroups);
    let { assignUsersList: { data: apiResponse } } = userGroups;
    let requestBody = formatCheckBoxesForAPI(users, apiResponse);
    yield fork(saga.handleAPIRequest, API.updateUsersInGUserGroup, { userGroupId, requestBody });
    yield take(ActionTypes.UPDATE_USERS_IN_USER_GROUP_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
}

function* assignUsersUnderUseerGrp() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP);

    let { additionalFilters, passedColumns } = additionalProps;
    let { userId, ...restAdditionalInfo } = additionalFilters;
    yield fork(saga.handleAPIRequest, API.fetchAssignUserForUserGroup, { params: { ...tableProps, ...restAdditionalInfo, langId }, userId });
    const userAssignRoleListAction = yield take([ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS, ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_FAILURE]);
    let userAssignUserGrpData = userAssignRoleListAction?.payload?.data?.data?.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userAssignUserGrpData);

    if (userAssignRoleListAction.type === ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP, getPayloadData(userAssignRoleListAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP, filterOptionsList: allFilterValues }));
    }

}

function* submitAssignUsersUnderUserGrp(action) {
    let { userId, assignUserObj } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.submitUsersUnderUserGrp, {
        userId,
        requestBody: assignUserObj
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS, ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_USERS_IN_USER_GROUP, selectedIds: [] }));
        yield put(Actions.fetchAssignUsersUnderUserGroup());
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
    }
}

export default function* userGroupSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_USER_GROUP, listUserGroup),
        takeLatest(ActionTypes.SAVE_USER_GROUP, saveUserGroup),
        takeLatest(ActionTypes.UPDATE_USER_GROUP, updateUserGroup),
        takeLatest(ActionTypes.DELETE_USER_GROUP, deleteUserGroup),
        takeLatest(ActionTypes.GET_USER_GROUP_BY_ID, getUserGroupByID),
        takeLatest(ActionTypes.FETCH_USERS_BY_USER_GROUP, fetchUsersByUserGroup),
        takeLatest(ActionTypes.UPDATE_USERS_IN_USER_GROUP, updateUsersInUserGroup),
        takeLatest(ActionTypes.ASSIGN_USERS_UNDER_USER_GROUP, assignUsersUnderUseerGrp),
        takeLatest(ActionTypes.SUBMIT_ASSIGN_USERS_UNDER_USER_GROUP, submitAssignUsersUnderUserGrp)
    ]);
}

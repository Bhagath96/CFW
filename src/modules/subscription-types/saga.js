import { takeLatest, all, call, select, fork, take, put, takeEvery } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import * as Routes from '../../routes';
import { MODULE, TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setSelectedIds, setTableDropdownFilterList } from '../../modules/common/actions';
import { actions } from '.';
import _ from 'lodash';

function* fetchSubscriptionTypeDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTION_TYPE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTION_TYPE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchSubscriptionTypeDetails, { params: { ...tableProps, langId } });

    const stateAction = yield take([ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_SUCCESS, ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SUBSCRIPTION_TYPE, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION_TYPE, filterOptionsList: allFilterValues }));
    }
}
function* saveSubscriptionType(action) {
    yield fork(saga.handleAPIRequest, API.saveSubscriptionType, action.payload.data);
    yield take(ActionTypes.SAVE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('subscription_topics') }));
    yield call(history.push, Routes.PATH.SUBSCRIPTION);
}
function* deleteSubscriptionType(action) {
    yield fork(saga.handleAPIRequest, API.deleteSubscriptionType, action.payload.data);
    yield take(ActionTypes.DELETE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('subscription_topics') }));
    yield call(fetchSubscriptionTypeDetails);
}
function* fetchSubscriptionTypeById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchSubscriptionTypeById, { langId, id: action.payload.data });
}
function* updateSubscriptionTypeData(action) {
    yield fork(saga.handleAPIRequest, API.updateSubscriptionType, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_SUBSCRIPTION_TYPE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('subscription_topics') }));
    yield call(history.push, Routes.PATH.SUBSCRIPTION);
}

function* listOrganizationRoles(action) {
    const language = yield select(getDefaultLanguage);
    const { id, member, type = null, full = false } = action.payload.data;
    const { id: langId } = language;
    let types = [ActionTypes.LIST_ORGANISATION_ROLE_REQUEST, ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS, ActionTypes.LIST_ORGANISATION_ROLE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ORGANIZATIONAL_ROLE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ORGANIZATIONAL_ROLE);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listOrganizationRole, { params: { ...tableProps, langId, member, type, ...MODULE }, types, id, full });
    const organizationRoleAction = yield take([ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS, ActionTypes.LIST_ORGANISATION_ROLE_FAILURE]);
    let tableData = getPayloadData(organizationRoleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(tableData, 'content', []));
    if (organizationRoleAction.type === ActionTypes.LIST_ORGANISATION_ROLE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, getPayloadData(organizationRoleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, filterOptionsList: allFilterValues }));
    }
}

function* submitAssignRole(action) {
    let { roleId, assignRoleObj, subscriptionTopicId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.submitAssignRole, {
        roleId,
        requestBody: assignRoleObj, subscriptionTopicId
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_ORGANIZATIONAL_ROLE, selectedIds: [] }));
        yield put(actions.listOrganizationRoles({ id: subscriptionTopicId }));
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('role') }));
    }
}

function* listUserGroups(action) {
    const language = yield select(getDefaultLanguage);
    const { id, member, type, full = false } = action.payload.data;
    const { id: langId } = language;
    let types = [ActionTypes.LIST_USER_GROUPS_REQUEST, ActionTypes.LIST_USER_GROUPS_SUCCESS, ActionTypes.LIST_USER_GROUPS_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_USER_GROUP);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_USER_GROUP);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listUserGroups, { params: { ...tableProps, langId, member, type }, types, id, full });
    const organizationRoleAction = yield take([ActionTypes.LIST_USER_GROUPS_SUCCESS, ActionTypes.LIST_USER_GROUPS_FAILURE]);
    let tableData = getPayloadData(organizationRoleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(tableData, 'content', []));
    if (organizationRoleAction.type === ActionTypes.LIST_USER_GROUPS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_USER_GROUP, getPayloadData(organizationRoleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_USER_GROUP, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_USER_GROUP, filterOptionsList: allFilterValues }));
    }
}

function* submitUserGroup(action) {
    let { assignUserGroupObj, subscriptionTopicId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.submitUserGroup, {
        requestBody: assignUserGroupObj, subscriptionTopicId
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_SUCCESS, ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_USER_GROUP, selectedIds: [] }));
        yield put(actions.listUserGroups({ id: subscriptionTopicId }));
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user_group') }));
    }
}

function* listHomePosts(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_HOME_POST);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_HOME_POST);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listHomePosts, { params: { ...tableProps, langId }, id: action.payload.data });

    const stateAction = yield take([ActionTypes.LIST_HOME_POSTS_SUCCESS, ActionTypes.LIST_HOME_POSTS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.LIST_HOME_POSTS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_HOME_POST, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_HOME_POST, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_HOME_POST, filterOptionsList: allFilterValues }));
    }
}

function* saveHomePost(action) {
    const { id } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.saveHomePost, action.payload.data);
    yield take(ActionTypes.SAVE_HOME_POST_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('posts') }));
    yield call(history.push, `${Routes.PATH.SUBSCRIPTION}/${id}/posts`);
}
function* deleteHomePost(action) {
    const { id } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.deleteHomePost, action.payload.data);
    yield take(ActionTypes.DELETE_HOME_POST_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('posts') }));
    yield call(listHomePosts, { payload: { data: id } });
}
function* fetchHomePostById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { id, postId } = action.payload.data;
    yield call(saga.handleAPIRequest, API.fetchHomePostById, { langId, id, postId });
}
function* updateHomePostData(action) {
    const { id } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateHomePost, action.payload.data);
    yield take(ActionTypes.UPDATE_HOME_POST_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('posts') }));
    yield call(history.push, `${Routes.PATH.SUBSCRIPTION}/${id}/posts`);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS, fetchSubscriptionTypeDetails),
        takeLatest(ActionTypes.SAVE_SUBSCRIPTION_TYPE_DETAILS, saveSubscriptionType),
        takeLatest(ActionTypes.DELETE_SUBSCRIPTION_TYPE_DETAILS, deleteSubscriptionType),
        takeLatest(ActionTypes.FETCH_SUBSCRIPTION_TYPE_DETAILS_BY_ID, fetchSubscriptionTypeById),
        takeLatest(ActionTypes.UPDATE_SUBSCRIPTION_TYPE_DETAILS, updateSubscriptionTypeData),
        takeEvery(ActionTypes.LIST_ORGANISATION_ROLE, listOrganizationRoles),
        takeLatest(ActionTypes.SUBMIT_ASSIGN_ROLE_TO_SUBSCRIPTION_TOPIC, submitAssignRole),
        takeEvery(ActionTypes.LIST_USER_GROUPS, listUserGroups),
        takeLatest(ActionTypes.SUBMIT_USER_GROUP_TO_SUBSCRIPTION_TOPIC, submitUserGroup),
        takeLatest(ActionTypes.LIST_HOME_POSTS, listHomePosts),
        takeLatest(ActionTypes.SAVE_HOME_POST_DETAILS, saveHomePost),
        takeLatest(ActionTypes.DELETE_HOME_POST_DETAILS, deleteHomePost),
        takeLatest(ActionTypes.FETCH_HOME_POST_BY_ID, fetchHomePostById),
        takeLatest(ActionTypes.UPDATE_HOME_POST_DETAILS, updateHomePostData)
    ]);
}


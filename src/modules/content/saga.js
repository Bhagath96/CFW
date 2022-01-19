import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { PATH } from '../../routes';

function* fetchContentDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_CONTENT);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_CONTENT);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchContentDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_CONTENT_DETAILS_SUCCESS, ActionTypes.FETCH_CONTENT_DETAILS_FAILURE]);
    if (stateAction.type === ActionTypes.FETCH_CONTENT_DETAILS_SUCCESS) {
        let stateTableData = getPayloadData(stateAction.payload, {});
        let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CONTENT, stateTableData);
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_CONTENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_CONTENT, filterOptionsList: allFilterValues }));
    }
}
function* saveContent(action) {
    const { formData } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.saveContent, formData);
    const contentAction = yield take([ActionTypes.SAVE_CONTENT_DETAILS_SUCCESS, ActionTypes.SAVE_CONTENT_DETAILS_FAILURE]);
    if (contentAction.type === ActionTypes.SAVE_CONTENT_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('content') }));
        yield call(history.push, PATH.CONTENT);
    }
}
function* deleteContent(action) {
    yield fork(saga.handleAPIRequest, API.deleteContent, { id: action.payload.data });
    const contentDeleteAction = yield take([ActionTypes.DELETE_CONTENT_DETAILS_SUCCESS, ActionTypes.DELETE_CONTENT_DETAILS_FAILURE]);
    if (contentDeleteAction.type === ActionTypes.DELETE_CONTENT_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('delete_success', { type: I18n.t('content') }));
        yield call(fetchContentDetails);
    }
}
function* fetchContentById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchContentById, { langId, ContentId: action.payload.data });
}

function* roleForContent() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchRole, { langId });
}
function* userGroupForContent() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchUserGroup, { langId });
}

function* defaultRoleForContent() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultRole, { langId });
    yield take([ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_SUCCESS, ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT_FAILURE]);
}
function* defaultUserGroupForContent() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultUserGroup, { langId });
}

function* updateContentData(action) {
    const { formData, id } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateContent, { formData, id });
    const updateDeleteAction = yield take([ActionTypes.UPDATE_CONTENT_DETAILS_SUCCESS, ActionTypes.UPDATE_CONTENT_DETAILS_FAILURE]);
    if (updateDeleteAction.type === ActionTypes.UPDATE_CONTENT_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('content') }));
        yield call(history.push, PATH.CONTENT);
    }
}


export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_CONTENT_DETAILS, fetchContentDetails),
        takeLatest(ActionTypes.SAVE_CONTENT_DETAILS, saveContent),
        takeLatest(ActionTypes.DELETE_CONTENT_DETAILS, deleteContent),
        takeLatest(ActionTypes.FETCH_CONTENT_DETAILS_BY_ID, fetchContentById),
        takeLatest(ActionTypes.UPDATE_CONTENT_DETAILS, updateContentData),
        takeLatest(ActionTypes.GET_ROLE_FOR_CONTENT, roleForContent),
        takeLatest(ActionTypes.GET_DEFAULT_ROLE_FOR_CONTENT, defaultRoleForContent),
        takeLatest(ActionTypes.GET_USER_GROUP_FOR_CONTENT, userGroupForContent),
        takeLatest(ActionTypes.GET_DEFAULT_USER_GROUP_FOR_CONTENT, defaultUserGroupForContent)

    ]);
}

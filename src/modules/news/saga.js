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

function* fetchNewsDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_NEWS);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_NEWS);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchNewsDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_NEWS_DETAILS_SUCCESS, ActionTypes.FETCH_NEWS_DETAILS_FAILURE]);
    if (stateAction.type === ActionTypes.FETCH_NEWS_DETAILS_SUCCESS) {
        let stateTableData = getPayloadData(stateAction.payload, {});
        let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.NEWS || []);
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_NEWS, stateTableData);
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_NEWS, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_NEWS, filterOptionsList: allFilterValues }));
    }
}
function* saveNews(action) {
    const { formData } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.saveNews, { formData });
    const newsAction = yield take([ActionTypes.SAVE_NEWS_DETAILS_SUCCESS, ActionTypes.SAVE_NEWS_DETAILS_FAILURE]);
    if (newsAction.type === ActionTypes.SAVE_NEWS_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('news') }));
        yield call(history.push, PATH.NEWS);
    }
}
function* deleteNews(action) {
    yield fork(saga.handleAPIRequest, API.deleteNews, { id: action.payload.data });
    const newsDeleteAction = yield take([ActionTypes.DELETE_NEWS_DETAILS_SUCCESS, ActionTypes.DELETE_NEWS_DETAILS_FAILURE]);
    if (newsDeleteAction.type === ActionTypes.DELETE_NEWS_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('delete_success', { type: I18n.t('news') }));
        yield call(fetchNewsDetails);
    }
}
function* fetchNewsById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchNewsById, { langId, NewsId: action.payload.data });
}

function* roleForNews() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchRoleForNews, { langId });
}
function* userGroupForNews() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchUserGroupForNews, { langId });
}

function* defaultRoleForNews() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultRoleForNews, { langId });
    yield take([ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_SUCCESS, ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS_FAILURE]);
}
function* defaultUserGroupForNews() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultUserGroupForNews, { langId });
}

function* updateNewsData(action) {
    const { formData, id } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateNews, { formData, id });
    const updateDeleteAction = yield take([ActionTypes.UPDATE_NEWS_DETAILS_SUCCESS, ActionTypes.UPDATE_NEWS_DETAILS_FAILURE]);
    if (updateDeleteAction.type === ActionTypes.UPDATE_NEWS_DETAILS_SUCCESS) {
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('news') }));
        yield call(history.push, PATH.NEWS);
    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_NEWS_DETAILS, fetchNewsDetails),
        takeLatest(ActionTypes.SAVE_NEWS_DETAILS, saveNews),
        takeLatest(ActionTypes.DELETE_NEWS_DETAILS, deleteNews),
        takeLatest(ActionTypes.FETCH_NEWS_DETAILS_BY_ID, fetchNewsById),
        takeLatest(ActionTypes.UPDATE_NEWS_DETAILS, updateNewsData),
        takeLatest(ActionTypes.GET_ROLE_FOR_NEWS, roleForNews),
        takeLatest(ActionTypes.GET_USER_GROUP_FOR_NEWS, userGroupForNews),
        takeLatest(ActionTypes.GET_DEFAULT_ROLE_FOR_NEWS, defaultRoleForNews),
        takeLatest(ActionTypes.GET_DEFAULT_USER_GROUP_FOR_NEWS, defaultUserGroupForNews)
    ]);
}

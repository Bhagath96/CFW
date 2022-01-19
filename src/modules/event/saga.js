import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import * as Routes from '../../routes';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchEventDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_EVENT);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_EVENT);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchEventDetails, { params: { ...tableProps, langId } });

    const stateAction = yield take([ActionTypes.FETCH_EVENT_DETAILS_SUCCESS, ActionTypes.FETCH_EVENT_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.event || []);

    if (stateAction.type === ActionTypes.FETCH_EVENT_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_EVENT, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_EVENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_EVENT, filterOptionsList: allFilterValues }));
    }
}
function* saveEvent(action) {
    const { formData } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.saveEvent, formData);
    yield take(ActionTypes.SAVE_EVENT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('event') }));
    yield call(history.push, Routes.PATH.EVENT);
}
function* deleteEvent(action) {
    yield fork(saga.handleAPIRequest, API.deleteEvent, action.payload.data);
    yield take(ActionTypes.DELETE_EVENT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('event') }));
    yield call(fetchEventDetails);
}
function* fetchEventById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchEventById, { langId, eventId: action.payload.data });
}
function* updateEventData(action) {
    yield fork(saga.handleAPIRequest, API.updateEvent, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_EVENT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('event') }));
    yield call(history.push, Routes.PATH.EVENT);
}

function* fetchRoles() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchRolesDetails, langId);
}
function* fetchDefaultRoles() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultRolesDetails, langId);
}
function* fetchUserGroups() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchUserGroupsDetails, langId);
}
function* fetchDefaultUserGroups() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDefaultUserGroupsDetails, langId);
}
function* fetchEventType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchEventType, langId);
}

function* fetchState() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchState, langId);
}
function* fetchDistrict(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const data = action.payload.data;
    yield call(saga.handleAPIRequest, API.fetchDistrict, { data, langId });
}
function* fetchLSGIType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchLSGITypes, langId);
}
function* fetchLSGI(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const data = action.payload;
    yield call(saga.handleAPIRequest, API.fetchLSGI, { params: { districtId: data?.districtId, lsgiTypeId: data?.lsgiTypeId, type: 'dropdown', langId: langId } });
}
function* fetchOnlinePlatform() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchOnlinePlatform, langId);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_EVENT_DETAILS, fetchEventDetails),
        takeLatest(ActionTypes.SAVE_EVENT_DETAILS, saveEvent),
        takeLatest(ActionTypes.DELETE_EVENT_DETAILS, deleteEvent),
        takeLatest(ActionTypes.FETCH_EVENT_DETAILS_BY_ID, fetchEventById),
        takeLatest(ActionTypes.UPDATE_EVENT_DETAILS, updateEventData),

        takeLatest(ActionTypes.FETCH_ROLES_DETAILS, fetchRoles),
        takeLatest(ActionTypes.FETCH_DEFAULT_ROLES_DETAILS, fetchDefaultRoles),
        takeLatest(ActionTypes.FETCH_USER_GROUPS_DETAILS, fetchUserGroups),
        takeLatest(ActionTypes.FETCH_DEFAULT_USER_GROUPS_DETAILS, fetchDefaultUserGroups),
        takeLatest(ActionTypes.FETCH_EVENT_TYPE, fetchEventType),

        takeLatest(ActionTypes.FETCH_STATE, fetchState),
        takeLatest(ActionTypes.FETCH_DISTRICT, fetchDistrict),
        takeLatest(ActionTypes.FETCH_LSGI_TYPE, fetchLSGIType),
        takeLatest(ActionTypes.FETCH_LSGI, fetchLSGI),
        takeLatest(ActionTypes.FETCH_ONLINE_PLATFORMS, fetchOnlinePlatform)

    ]);
}


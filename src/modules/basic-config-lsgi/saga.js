import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import * as Routes from '../../routes';
import { I18n } from '../../common/components';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchLSGIDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    // yield call(saga.handleAPIRequest, API.fetchLSGIDetailsAPI, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_LSGI);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_LSGI);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchLSGIDetailsAPI, { params: { ...tableProps, langId } });

    const lsgiAction = yield take([ActionTypes.FETCH_LSGI_DETAILS_SUCCESS, ActionTypes.FETCH_LSGI_DETAILS_FAILURE]);
    let lsgiTableData = getPayloadData(lsgiAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, lsgiTableData.content || []);

    if (lsgiAction.type === ActionTypes.FETCH_LSGI_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_LSGI, getPayloadData(lsgiAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_LSGI, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_LSGI, filterOptionsList: allFilterValues }));
    }
}
function* saveLSGI(action) {
    yield fork(saga.handleAPIRequest, API.saveLSGI, action.payload.data);
    yield take(ActionTypes.SAVE_LSGI_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('lsgi') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_LSGI);
}
function* deleteLSGI(action) {
    yield fork(saga.handleAPIRequest, API.deleteLSGI, action.payload.data);
    yield take(ActionTypes.DELETE_LSGI_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('lsgi') }));
    yield call(fetchLSGIDetails);
}
function* fetchLSGIById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchLSGIDataById, { langId, lsgiId: action.payload.data });
}
function* updateLSGIData(action) {
    yield fork(saga.handleAPIRequest, API.updateLSGI, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_LSGI_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('lsgi') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_LSGI);
}
function* fetchDistrict(data) {
    const stateID = data.payload.data;
    yield call(saga.handleAPIRequest, API.fetchDistrict, stateID);
}

function* loadLSGITypes() {
    yield call(saga.handleAPIRequest, API.loadLSGITypes);
}
function* loadBlockPanchayath(action) {
    const types = [ActionTypes.LOAD_BLOCK_PANCHAYATH_REQUEST, ActionTypes.LOAD_BLOCK_PANCHAYATH_SUCCESS, ActionTypes.LOAD_BLOCK_PANCHAYATH_FAILURE];
    const districtId = action.payload.data;
    yield call(saga.handleAPIRequest, API.loadBlockPanchayath, { types, districtId });
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_LSGI_DETAILS, fetchLSGIDetails),
        takeLatest(ActionTypes.SAVE_LSGI_DETAILS, saveLSGI),
        takeLatest(ActionTypes.DELETE_LSGI_DETAILS, deleteLSGI),
        takeLatest(ActionTypes.FETCH_LSGI_DETAILS_BY_ID, fetchLSGIById),
        takeLatest(ActionTypes.UPDATE_LSGI_DETAILS, updateLSGIData),
        takeLatest(ActionTypes.LIST_DISTRICT, fetchDistrict),
        takeLatest(ActionTypes.LOAD_LSGI_TYPES, loadLSGITypes),
        takeLatest(ActionTypes.LOAD_BLOCK_PANCHAYATH, loadBlockPanchayath)
    ]);
}

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

function* fetchStateDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_STATE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_STATE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchStateDetails, { params: { ...tableProps, langId } });

    const stateAction = yield take([ActionTypes.FETCH_STATE_DETAILS_SUCCESS, ActionTypes.FETCH_STATE_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_STATE_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_STATE, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_STATE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_STATE, filterOptionsList: allFilterValues }));
    }
}
function* saveState(action) {
    yield fork(saga.handleAPIRequest, API.saveState, action.payload.data);
    yield take(ActionTypes.SAVE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('state') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_STATE);
}
function* deleteState(action) {
    yield fork(saga.handleAPIRequest, API.deleteState, action.payload.data);
    yield take(ActionTypes.DELETE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('state') }));
    yield call(fetchStateDetails);
}
function* fetchStateById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchStateById, { langId, stateID: action.payload.data });
}
function* updateStateData(action) {
    yield fork(saga.handleAPIRequest, API.updateState, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('state') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_STATE);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_STATE_DETAILS, fetchStateDetails),
        takeLatest(ActionTypes.SAVE_STATE_DETAILS, saveState),
        takeLatest(ActionTypes.DELETE_STATE_DETAILS, deleteState),
        takeLatest(ActionTypes.FETCH_STATE_DETAILS_BY_ID, fetchStateById),
        takeLatest(ActionTypes.UPDATE_STATE_DETAILS, updateStateData)
    ]);
}


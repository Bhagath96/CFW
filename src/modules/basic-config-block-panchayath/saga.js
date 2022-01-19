import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { history } from '../../../src/common';
import * as Routes from '../../routes';
import { I18n } from '../../common/components';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchBlockPanchayathDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_BLOCK_PANCHAYATH);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_BLOCK_PANCHAYATH);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchBlockPanchayathDetailsAPI, { params: { ...tableProps, langId } });

    const action = yield take([ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (action.type === ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_BLOCK_PANCHAYATH, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_BLOCK_PANCHAYATH, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_BLOCK_PANCHAYATH, filterOptionsList: allFilterValues }));
    }
}
function* saveBlockPanchayath(action) {
    yield fork(saga.handleAPIRequest, API.saveBlockPanchayath, action.payload.data);
    yield take(ActionTypes.SAVE_BLOCK_PANCHAYATH_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('block_panchayath') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_BLOCK_PANCHAYATH);
}
function* deleteBlockPanchayath(action) {
    yield fork(saga.handleAPIRequest, API.deleteBlockPanchayath, action.payload.data);
    yield take(ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('block_panchayath') }));
    yield call(fetchBlockPanchayathDetails);
}
function* fetchBlockPanchayathById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchBlockPanchayathDataById, { langId, distId: action.payload.data });
}
function* updateBlockPanchayathData(action) {
    yield fork(saga.handleAPIRequest, API.updateBlockPanchayath, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_BLOCK_PANCHAYATH_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('block_panchayath') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_BLOCK_PANCHAYATH);
}

function* fetchDistrict(action) {
    // const stateID = data.payload.data;
    yield call(saga.handleAPIRequest, API.fetchDistrict, action.payload.data);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS, fetchBlockPanchayathDetails),
        takeLatest(ActionTypes.SAVE_BLOCK_PANCHAYATH_DETAILS, saveBlockPanchayath),
        takeLatest(ActionTypes.DELETE_BLOCK_PANCHAYATH_DETAILS, deleteBlockPanchayath),
        takeLatest(ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID, fetchBlockPanchayathById),
        takeLatest(ActionTypes.UPDATE_BLOCK_PANCHAYATH_DETAILS, updateBlockPanchayathData),
        takeLatest(ActionTypes.LIST_DISTRICT_LIST_BY_STATE, fetchDistrict)
    ]);
}

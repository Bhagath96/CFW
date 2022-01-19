import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { history } from '../../../src/common';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import * as Routes from '../../routes';
import { I18n } from '../../common/components';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchDistrictDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_DISTRICT);
    let { passedColumns } = additionalProps;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_DISTRICT);
    yield fork(saga.handleAPIRequest, API.fetchDistrictDetailsAPI, { params: { ...tableProps, langId } });
    const districtAction = yield take([ActionTypes.FETCH_DISTRICT_DETAILS_SUCCESS, ActionTypes.FETCH_DISTRICT_DETAILS_FAILURE]);

    let districtTableData = getPayloadData(districtAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, districtTableData.content || []);

    if (districtAction.type === ActionTypes.FETCH_DISTRICT_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_DISTRICT, getPayloadData(districtAction.payload, {}));

        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_DISTRICT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_DISTRICT, filterOptionsList: allFilterValues }));

    }
}
function* saveDistrict(action) {
    yield fork(saga.handleAPIRequest, API.saveDistrict, action.payload.data);
    yield take(ActionTypes.SAVE_DISTRICT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('district') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_DISTRICT);
}
function* deleteDistrict(action) {
    yield fork(saga.handleAPIRequest, API.deleteDistrict, action.payload.data);
    yield take(ActionTypes.DELETE_DISTRICT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('district') }));
    yield call(fetchDistrictDetails);
}
function* fetchDistrictById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDistrictDataById, { langId, distId: action.payload.data });
}
function* updateDistrictData(action) {
    yield fork(saga.handleAPIRequest, API.updateDistrict, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_DISTRICT_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('district') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_DISTRICT);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_DISTRICT_DETAILS, fetchDistrictDetails),
        takeLatest(ActionTypes.SAVE_DISTRICT_DETAILS, saveDistrict),
        takeLatest(ActionTypes.DELETE_DISTRICT_DETAILS, deleteDistrict),
        takeLatest(ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID, fetchDistrictById),
        takeLatest(ActionTypes.UPDATE_DISTRICT_DETAILS, updateDistrictData)
    ]);
}


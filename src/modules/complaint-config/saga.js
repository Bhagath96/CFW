import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData, formatCheckBoxesForAPI, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { getComplaintConfig } from './selectors';
import _ from '../../utils/LodashUtils';
import { PATH } from '../../routes';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { I18n } from '../../common/components';


function* listComplaintConfig() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_COMPLAINT_CONFIG_REQUEST, ActionTypes.LIST_COMPLAINT_CONFIG_SUCCESS, ActionTypes.LIST_COMPLAINT_CONFIG_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_COMPLAINT_CONFIG);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_COMPLAINT_CONFIG);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listComplaintConfig, { params: { ...tableProps, langId }, types });

    const action = yield take([ActionTypes.LIST_COMPLAINT_CONFIG_SUCCESS, ActionTypes.LIST_COMPLAINT_CONFIG_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.LIST_COMPLAINT_CONFIG_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_COMPLAINT_CONFIG, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_COMPLAINT_CONFIG, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_COMPLAINT_CONFIG, filterOptionsList: allFilterValues }));
    }
}

function* sentComplaintConfig(action) {
    yield fork(saga.handleAPIRequest, API.sentComplaintConfig, action.payload.data);
    yield take(ActionTypes.SENT_COMPLAINT_CONFIG_SUCCESS);
    yield call(successNotify, 'ComplaintConfig Type created successfully');
    yield call(history.push, `${PATH.COMPLAINT_CONFIG}`);

}

function* editComplaintConfig(action) {
    yield fork(saga.handleAPIRequest, API.editComplaintConfig, action.payload.id, action.payload.data);
    const currentActionType = yield take([ActionTypes.EDIT_COMPLAINT_CONFIG_SUCCESS, ActionTypes.EDIT_COMPLAINT_CONFIG_FAILURE]);
    if (currentActionType.type === ActionTypes.EDIT_COMPLAINT_CONFIG_SUCCESS) {
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('complaint_config') }));
        yield call(history.push, `${PATH.COMPLAINT_CONFIG}`);

    }
}
function* getComplaintById(action) {
    yield call(saga.handleAPIRequest, API.getComplaintConfigById, action.payload.id);

}

function* deleteComplaintConfig(action) {
    yield fork(saga.handleAPIRequest, API.deleteComplaintConfig, action.payload.data);
    const currentActionType = yield take([ActionTypes.DELETE_COMPLAINT_CONFIG_SUCCESS, ActionTypes.DELETE_COMPLAINT_CONFIG_FAILURE]);
    if (currentActionType.type === ActionTypes.DELETE_COMPLAINT_CONFIG_SUCCESS) {
        yield call(successNotify, 'ComplaintConfig deleted successfully.');
    }

    yield delay(500);
    yield call(listComplaintConfig);
}

function* saveComplaintConfigCHK(action) {
    let data = _.get(action, 'payload.data', {});
    let { Id, formData: assignModulesView } = data;
    let complaintConfigDetails = yield select(getComplaintConfig);
    let { assignComplaintConfigList } = complaintConfigDetails;
    let requestBody = formatCheckBoxesForAPI(assignModulesView || [], assignComplaintConfigList.data || []);
    yield fork(saga.handleAPIRequest, API.saveComplaintConfig, Id, requestBody);
    const currentActionType = yield take([ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_SUCCESS, ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_FAILURE]);
    if (currentActionType.type === ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK_SUCCESS) {
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('complaint_config') }));

    }
}

function* fetchComplaintConfig(action) {
    yield fork(saga.handleAPIRequest, API.fetchComplaintConfig, action.payload.data);
}
export default function* ComplaintConfigSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_COMPLAINT_CONFIG, listComplaintConfig),
        takeLatest(ActionTypes.SENT_COMPLAINT_CONFIG, sentComplaintConfig),
        takeLatest(ActionTypes.EDIT_COMPLAINT_CONFIG, editComplaintConfig),
        takeLatest(ActionTypes.GET_COMPLAINT_CONFIG_BY_ID, getComplaintById),
        takeLatest(ActionTypes.DELETE_COMPLAINT_CONFIG, deleteComplaintConfig),
        takeLatest(ActionTypes.FETCH_COMPLAINT_CONFIG_FOR_CHK, fetchComplaintConfig),
        takeLatest(ActionTypes.SAVE_COMPLAINT_CONFIG_FOR_CHK, saveComplaintConfigCHK)
    ]);
}

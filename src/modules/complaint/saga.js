import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { TABLE_IDS } from './constant';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { I18n } from '../../common/components';

function* fetchComplaintDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_COMPLAINT);
    let { passedColumns } = additionalProps;
    // yield call(saga.handleAPIRequest, API.fetchStateDetails, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_COMPLAINT);
    yield fork(saga.handleAPIRequest, API.fetchComplaintDetails, { params: { ...tableProps, langId } });
    const complaintAction = yield take([ActionTypes.FETCH_COMPLAINT_DETAILS_SUCCESS, ActionTypes.FETCH_COMPLAINT_DETAILS_FAILURE]);
    let complaintTableData = getPayloadData(complaintAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, complaintTableData.content || []);

    if (complaintAction.type === ActionTypes.FETCH_COMPLAINT_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_COMPLAINT, getPayloadData(complaintAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_COMPLAINT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_COMPLAINT, filterOptionsList: allFilterValues }));
    }
}

function* assignComplaintsServiceWorker(action) {
    yield fork(saga.handleAPIRequest, API.assignComplaintsServiceWorker, action.payload.data);
    const complaintAction = yield take([ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]);
    if (complaintAction.type === ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS) {
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('service_worker') }));
        yield call(fetchComplaintDetails);
    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_COMPLAINT_DETAILS, fetchComplaintDetails),
        takeLatest(ActionTypes.ASSIGN_SERVICE_WORKER, assignComplaintsServiceWorker)
    ]);
}


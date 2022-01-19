import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listOrganizationType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_ORGANIZATION_TYPE_REQUEST, ActionTypes.LIST_ORGANIZATION_TYPE_SUCCESS, ActionTypes.LIST_ORGANIZATION_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ORGANIZATION_TYPE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ORGANIZATION_TYPE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listOrganizationType, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_ORGANIZATION_TYPE_SUCCESS, ActionTypes.LIST_ORGANIZATION_TYPE_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.LIST_ORGANIZATION_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ORGANIZATION_TYPE, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION_TYPE, filterOptionsList: allFilterValues }));
    }
}

function* sentOrganizationType(action) {
    yield fork(saga.handleAPIRequest, API.sentOrganizationType, action.payload.data);
    yield take(ActionTypes.SENT_ORGANIZATION_TYPE_SUCCESS);
    yield call(successNotify, 'Organization Type created successfully');
    yield call(history.push, '/admin/index/organization-type');

}

function* editOrganizationType(action) {
    yield fork(saga.handleAPIRequest, API.editOrganizationType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_ORGANIZATION_TYPE_SUCCESS);
    yield call(successNotify, 'Organization type updated successfully');
    yield call(history.push, '/admin/index/organization-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getOrganizationTypeById, action.payload.id);

}

function* deleteOrganizationType(action) {
    yield fork(saga.handleAPIRequest, API.deleteOrganizationType, action.payload.data);
    yield take(ActionTypes.DELETE_ORGANIZATION_TYPE_SUCCESS);
    yield call(successNotify, 'Organization Type deleted successfully.');
    yield delay(500);
    yield call(listOrganizationType);
}

export default function* OrganizationTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_ORGANIZATION_TYPE, listOrganizationType),
        takeLatest(ActionTypes.SENT_ORGANIZATION_TYPE, sentOrganizationType),
        takeLatest(ActionTypes.EDIT_ORGANIZATION_TYPE, editOrganizationType),
        takeLatest(ActionTypes.GET_ORGANIZATION_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_ORGANIZATION_TYPE, deleteOrganizationType)
    ]);
}

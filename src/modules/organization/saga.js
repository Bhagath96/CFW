import {
  takeLatest,
  all,
  call,
  fork,
  take,
  select,
  put
} from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import _ from '../../utils/LodashUtils';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';

import {
  getSelectId,
  getPayloadData,
  getAllFilterOptionValues,
  formatCheckBoxesForAPI
} from '../../utils/ApiUtils';
import { PATH } from '../../routes';
import { getDefaultLanguage } from '../common/selectors';
import * as Actions from './actions';
import { I18n } from '../../common/components';
import { setInitialFilterList, setSelectedIds, setTableDropdownFilterList } from '../common/actions';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { RESPONSE_TYPE } from '../../common/constants';
import { getOrganization } from './selectors';


function formatOrganizationRequest(action) {
  let request = {};
  let { payload: { data: { sort, labels } = {} } = {} } = action;

  if (sort) {
    request.sort = parseInt(sort || '0');
  }

  if (labels || [].length > 0) {
    request.labels = labels;
  }
  _.set(
    request,
    'parentOrganizationId',
    getSelectId(_.get(action, 'payload.data.parentOrganization', null))
  );
  _.set(request, 'name', _.get(action, 'payload.data.name', null));
  _.set(request, 'code', _.get(action, 'payload.data.code', null));
  _.set(
    request,
    'organizationTypeId',
    getSelectId(_.get(action, 'payload.data.organizationType', null))
  );
  _.set(
    request,
    'stateId',
    getSelectId(_.get(action, 'payload.data.state', null))
  );
  _.set(
    request,
    'districtId',
    getSelectId(_.get(action, 'payload.data.district', null))
  );
  _.set(
    request,
    'lsgiId',
    getSelectId(_.get(action, 'payload.data.lsgi', null))
  );
  return request;
}

function* listOrganization() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ORGANIZATION);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ORGANIZATION);

  let { passedColumns } = additionalProps;
  yield fork(saga.handleAPIRequest, API.listOrganization, { params: { ...tableProps, langId } });
  const organizationAction = yield take([ActionTypes.LIST_ORGANISATION_SUCCESS, ActionTypes.LIST_ORGANISATION_FAILURE]);
  let orgTableData = organizationAction.payload.data.data.content || [];

  let allFilterValues = getAllFilterOptionValues(passedColumns, orgTableData);
  if (organizationAction.type === ActionTypes.LIST_ORGANISATION_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ORGANIZATION, getPayloadData(organizationAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ORGANIZATION, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION, filterOptionsList: allFilterValues }));

  }
}
function* fetchOrganizationDetails(action) {
  yield call(saga.handleAPIRequest, API.fetchOrganizationDetails, {
    organizationId: action.payload.data
  });
}
function* saveOrganization(action) {
  yield fork(
    saga.handleAPIRequest,
    API.saveOrganization,
    formatOrganizationRequest(action)
  );
  const saveAction = yield take([ActionTypes.SAVE_ORGANIZATION_SUCCESS, ActionTypes.SAVE_ORGANIZATION_FAILED]);
  if (saveAction.type === ActionTypes.SAVE_ORGANIZATION_SUCCESS) {
    yield put(Actions.clearReducer());
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('organization') }));
    yield call(history.push, `${PATH.ORGANIZATION}`);
  }
}

function* updateOrganization(action) {
  let organizationId = Number(_.get(action, 'payload.data.organizationId', ''));
  yield fork(saga.handleAPIRequest, API.updateOrganization, {
    organizationId,
    data: formatOrganizationRequest(action)
  });
  const updateAction = yield take([ActionTypes.UPDATE_ORGANIZATION_SUCCESS, ActionTypes.UPDATE_ORGANIZATION_FAILED]);
  if (updateAction.type === ActionTypes.UPDATE_ORGANIZATION_SUCCESS) {
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('organization') }));
  }
}

function* deleteOrganization(action) {
  yield fork(
    saga.handleAPIRequest,
    API.deleteOrganization,
    action.payload.data
  );
  yield take(ActionTypes.DELETE_ORGANISATION_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('organization') }));
  yield call(listOrganization);
}
function* loadState() {
  yield call(saga.handleAPIRequest, API.loadStates, { body: {} });
}

function* loadDistrict(action) {
  const stateId = _.get(action, 'payload.data', '');
  yield call(saga.handleAPIRequest, API.loadDistricts, { stateId });
}

function* loadDistrictPanchayath(action) {
  const districtId = _.get(action, 'payload.data.id.districtId', '');
  yield call(saga.handleAPIRequest, API.loadDistrictPanchayath, { districtId });
}

function* loadBlockPanchayath(action) {
  const districtId = _.get(action, 'payload.data.id.districtId', '');
  yield call(saga.handleAPIRequest, API.loadBlockPanchayath, { districtId });
}

function* loadLSGIs(action) {
  const { districtId, lsgiTypeId } = action?.payload?.data;
  yield call(saga.handleAPIRequest, API.loadLSGI, { districtId, lsgiTypeId });
}
function* loadLSGITypes() {
  const types = [ActionTypes.LOAD_LSGI_TYPES_REQUEST, ActionTypes.LOAD_LSGI_TYPES_SUCCESS, ActionTypes.LOAD_LSGI_TYPES_FAILED];
  yield call(saga.handleAPIRequest, API.loadLSGITypes, { types, body: {} });
}
function* loadParentOrganizations() {
  yield call(saga.handleAPIRequest, API.loadParentOrganizations);
}
function* loadOrganizationTypes() {
  yield call(saga.handleAPIRequest, API.loadOrganizationTypes);
}
function* fetchOrganizationAssignUsers() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_ORG_USERS);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_ORG_USERS);

  let { additionalFilters, passedColumns } = additionalProps;
  let { organizationId, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.fetchOrganizationAssignUsers, { params: { ...tableProps, ...restAdditionalInfo, langId }, organizationId });
  const usersListAction = yield take([ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE]);
  let userTableData = usersListAction.payload.data.data.content;
  let allFilterValues = getAllFilterOptionValues(passedColumns, userTableData);

  if (usersListAction.type === ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_ORG_USERS, getPayloadData(usersListAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS, filterOptionsList: allFilterValues }));
  }
}

function* updateUserOrganizationMapping(action) {
  let { organizationId, users } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.updateUserOrganizationMapping, {
    organizationId,
    requestBody: users
  });
  const updateAssignUserAction = yield take([ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS, ActionTypes.UPDATE_CHK_USER_ORGANIZATION_FAILURE]);
  if (updateAssignUserAction.type === ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS) {
    yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_ORG_USERS, selectedIds: [] }));
    yield put(Actions.fetchOrganizationAssignUsers());
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
  }
}

function* loadOrganizationRoleTypes(action) {
  const { type } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.loadOrganizationRoleTypes);
  if (type === RESPONSE_TYPE.DROP_DOWN) {
    const response = yield take(ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS);
    yield put(Actions.setOrgRoleType(response.payload.data));
  }

}

function* fetchassignRole() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_ROLE);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_ROLE);

  let { additionalFilters, passedColumns } = additionalProps;
  let { organizationId, roleId, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.fetchAssignRole, { params: { ...tableProps, ...restAdditionalInfo, langId }, organizationId, roleId });
  const usersListAction = yield take([ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE]);
  let userTableData = usersListAction?.payload?.data?.data?.content || [];
  let allFilterValues = getAllFilterOptionValues(passedColumns, userTableData);

  if (usersListAction.type === ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_ROLE, getPayloadData(usersListAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_ROLE, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ROLE, filterOptionsList: allFilterValues }));
  }
}

function* submitAssignRole(action) {
  let { organizationId, roleId, assignRoleObj } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.submitAssignRoles, {
    roleId,
    requestBody: assignRoleObj,
    organizationId
  });
  const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_FAILURE]);
  if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS) {
    yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_ROLE, selectedIds: [] }));
    yield put(Actions.fetchAssignRoleInOrg());
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('role') }));
  }
}

function* fetchModulesForChk(action) {
  yield fork(
    saga.handleAPIRequest,
    API.fetchModulesForChk,
    action.payload.data
  );
}
function* fetchRolesForListBox(action) {
  yield fork(saga.handleAPIRequest, API.fetchRolesList, action.payload.data);
}
function* saveModuleInCHK(action) {
  let data = _.get(action, 'payload.data', {});
  let { organizationId, formData: assignModulesView } = data;
  let organizationDetails = yield select(getOrganization);
  let { assignModuleList } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    assignModulesView || [],
    assignModuleList.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.saveModules,
    organizationId,
    requestBody
  );
  yield take(ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('module') }));
}
function* fetchRoleAssignedModulesForCHK(action) {
  yield fork(
    saga.handleAPIRequest,
    API.fetchAssignedModuleForCHK,
    action.payload.data
  );
}
function* RoleAssignedModuleSave(action) {
  let data = _.get(action, 'payload.data', {});
  let { organizationId, Roles, moduleMapping } = data;
  let organizationDetails = yield select(getOrganization);
  let { roleAssignModuleList } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    moduleMapping || [],
    roleAssignModuleList.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.saveAssignedModules,
    organizationId,
    Roles,
    requestBody
  );
  yield take(ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS);
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('module') }));
}

function* loadAPIProviders() {
  yield call(saga.handleAPIRequest, API.loadAPIProviders);
}
function* getNotificationProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadNotificationProviders,
    action.payload.id,
    action.payload.notificationApiType
  );
}

function* updateApiProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.updateApiProviders,
    action.payload.id,
    action.payload.data
  );
  yield take(ActionTypes.UPDATE_API_PROVIDER_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('api_provider') }));
}

function* postApiProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.postApiProviders,
    action.payload.id,
    action.payload.data
  );
  yield take(ActionTypes.POST_API_PROVIDER_SUCCESS);
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('api_provider') }));
}
export default function* organizationSaga() {
  yield all([
    takeLatest(ActionTypes.ORGANIZATION_COMMON_STATE, loadState),
    takeLatest(ActionTypes.LOAD_DISTRICTS, loadDistrict),
    takeLatest(ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH, loadBlockPanchayath),
    takeLatest(ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH, loadDistrictPanchayath),
    takeLatest(ActionTypes.LOAD_LSGIS, loadLSGIs),
    takeLatest(ActionTypes.LOAD_LSGI_TYPES, loadLSGITypes),
    takeLatest(ActionTypes.LIST_ORGANISATION, listOrganization),
    takeLatest(ActionTypes.FETCH_ORGANIZATION_DETAILS, fetchOrganizationDetails),
    takeLatest(ActionTypes.DELETE_ORGANISATION, deleteOrganization),
    takeLatest(ActionTypes.SAVE_ORGANIZATION, saveOrganization),
    takeLatest(ActionTypes.UPDATE_ORGANIZATION, updateOrganization),
    takeLatest(ActionTypes.LOAD_PARENT_ORGANIZATIONS, loadParentOrganizations),
    takeLatest(ActionTypes.LOAD_ORGANIZATION_TYPES, loadOrganizationTypes),

    takeLatest(ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS, fetchOrganizationAssignUsers),
    takeLatest(ActionTypes.UPDATE_CHK_USER_ORGANIZATION, updateUserOrganizationMapping),
    takeLatest(ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES, loadOrganizationRoleTypes),
    takeLatest(ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG, fetchassignRole),
    takeLatest(ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG, submitAssignRole),

    takeLatest(ActionTypes.FETCH_MODULES_FOR_CHK, fetchModulesForChk),
    takeLatest(ActionTypes.FETCH_ROLESLIST_FOR_MODULE, fetchRolesForListBox),
    takeLatest(ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK, fetchRoleAssignedModulesForCHK),
    takeLatest(ActionTypes.SAVE_MODULES_FOR_CHK, saveModuleInCHK),
    takeLatest(ActionTypes.SAVE_ASSIGNED_MODULES, RoleAssignedModuleSave),


    takeLatest(ActionTypes.LOAD_API_PROVIDERS, loadAPIProviders),
    takeLatest(ActionTypes.GET_NOTIFICATION_API_PROVIDER, getNotificationProviders),
    takeLatest(ActionTypes.UPDATE_API_PROVIDER, updateApiProvider),
    takeLatest(ActionTypes.POST_API_PROVIDER, postApiProvider)

  ]);
}

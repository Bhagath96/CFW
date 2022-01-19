import { takeLatest, all, call, fork, take, select, delay, put, takeEvery } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import _ from '../../utils/LodashUtils';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getUser } from './selectors';
import { formatCheckBoxesForAPI, getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../common/selectors';
import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import * as Actions from './actions';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList, setSelectedIds } from '../common/actions';


function* listUsers() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_USER_REQUEST, ActionTypes.LIST_USER_SUCCESS, ActionTypes.LIST_USER_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_USERS);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_USERS);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.listUser, { params: { ...tableProps, langId }, types });
    const userAction = yield take([ActionTypes.LIST_USER_SUCCESS, ActionTypes.LIST_USER_FAILURE]);
    let userTableData = getPayloadData(userAction.payload.data, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(userTableData, 'content', []));
    if (userAction.type === ActionTypes.LIST_USER_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_USERS, getPayloadData(userAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_USERS, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_USERS, filterOptionsList: allFilterValues }));

    }
}

function* fetchInitialUsers() {
    let data = {
        page: DEFAULT_TABLE_PROPS.pageNo,
        size: DEFAULT_TABLE_PROPS.pageSize
    };
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const types = [ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_REQUEST, ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_SUCCESS, ActionTypes.FETCH_INITIAL_PAGEBLE_USERS_FAILURE];
    yield call(saga.handleAPIRequest, API.listUser, { data: { ...data, langId }, types });
}


function* addUsers(action) {
    let organizationId = _.get(action, 'payload.data.organization.id', '');
    let request = { ...action.payload.data, organizationId };
    delete request.organization;
    yield fork(saga.handleAPIRequest, API.addUser, action.payload.data);
    const response = yield take(ActionTypes.ADD_USER_SUCCESS);
    const { payload: { data = {} } = {} } = response;
    const roleId = data.data.id ? data.data.id : null;
    yield call(history.push, `${PATH.USER}/${roleId}/details`);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('user') }));
}

//generator function for get user by id
function* getUserById(action) {
    yield fork(saga.handleAPIRequest, API.getUserById, action.payload.id);
}

//function for updating user
function* updateUser(action) {
    //destructuring to id and single object
    const { id, data } = action.payload;
    yield fork(saga.handleAPIRequest, API.updateUser, id, data);
    //if it is successfull redirect to next page
    yield take(ActionTypes.UPDATE_USER_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('organization') }));
}

//update user organisation
function* updateUserOrganisation(action) {
    const { id, data } = action.payload;
    yield fork(saga.handleAPIRequest, API.updateUserOrganization, id, data);
    yield take(ActionTypes.UPDATE_USER_ORGANISATION_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('organization') }));
}

function* updateUserByRole(action) {
    const { id, data } = action.payload;
    yield fork(saga.handleAPIRequest, API.updateUserRoles, id, data);
    yield take(ActionTypes.UPDATE_USER_ROLES_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('user_role') }));
}

function* updateUserPassword(action) {
    yield fork(saga.handleAPIRequest, API.updateUserPassword, { userId: _.get(action, 'payload.data.userId', ''), data: { password: _.get(action, 'payload.data.password', null) } });
    let responseUpdate = yield take([ActionTypes.UPDATE_USER_PASSWORD_SUCCESS, ActionTypes.UPDATE_USER_PASSWORD_FAILURE]);
    if (responseUpdate.type === ActionTypes.UPDATE_USER_PASSWORD_SUCCESS) {
        yield call(successNotify, I18n.t('update_password_success'));

    }
}

function* listCountryCodes() {
    yield fork(saga.handleAPIRequest, API.listCountryCode);
}

//Currently Not Using
function* addMultipleOrganisation(action) {
    yield fork(saga.handleAPIRequest, API.addMultipleOrganisations, action.payload.data);
}

function* searchUser(action) {
    yield fork(saga.handleAPIRequest, API.searchUser, action.payload.data);
}
function* updateUserAddress(action) {
    yield fork(saga.handleAPIRequest, API.updateUserAddress, action.payload);
    yield take(ActionTypes.UPDATE_USER_ADDRESS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('address') }));

}

function* deleteUser(action) {
    yield fork(saga.handleAPIRequest, API.deleteUser, action.payload.data);
    yield take(ActionTypes.DELETE_USER_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('user') }));
    yield delay(500);
    yield call(listUsers);
}
function* loadState() {
    yield call(saga.handleAPIRequest, API.loadStates, { body: {} });
}
function* listDistricts(action) {
    const { identifier, id: { stateId } } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.loadDistricts, { stateId });
    const districtAction = yield take(ActionTypes.LIST_DISTRICTS_FOR_ADDRESS_SUCCESS);
    yield put(Actions.setDistrictsForAddress({ [identifier]: getPayloadData(districtAction.payload) }));
}
function* getAddressOfUser(action) {
    yield fork(saga.handleAPIRequest, API.getAddressOfUser, action.payload);
    let userAddressAction = yield take(ActionTypes.GET_ADDRESS_OF_USER_SUCCESS);
    let userAddressData = getPayloadData(userAddressAction.payload, {});
    const permanentAddress = _.find(userAddressData, ['addressType.id', 1]);
    const currentAddress = _.find(userAddressData, ['addressType.id', 2]);
    yield call(listDistricts, {
        payload: {
            data: {
                identifier: 'PR',
                id: {
                    stateId: _.get(permanentAddress, 'state.id', null)
                }
            }
        }
    });
    yield call(listDistricts, {
        payload: {
            data: {
                identifier: 'CR',
                id: {
                    stateId: _.get(currentAddress, 'state.id', null)
                }
            }
        }
    });
}
function* loadOrganisationForUser(action) {
    yield call(saga.handleAPIRequest, API.loadOrganisatiionWithUserId, action.payload.id);
}
function* loadRoleForUser(action) {
    yield call(saga.handleAPIRequest, API.loadRoleWithUserId, action.payload.id);
}
function* updateOrganisationForUser(action) {
    let { users } = action.payload.data;
    let userOrganisation = yield select(getUser);
    let { assignOrganisationList: { data: { associations = [] } } } = userOrganisation;
    let requestBody = formatCheckBoxesForAPI(users, associations);
    yield fork(saga.handleAPIRequest, API.editOrganisatiionWithUserId, { id: action.payload.id, requestBody }, action.payload.data.defaultOrganizationId);
    yield take(ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('organisation') }));

}

function* updateRoleForUser(action) {

    let { users } = action.payload.data;
    let userRole = yield select(getUser);
    let { assignRoleList: { data } } = userRole;
    let requestBody = formatCheckBoxesForAPI(users, data);
    yield fork(saga.handleAPIRequest, API.editRoleWithUserId, { id: action.payload.id, requestBody });
    yield take(ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user_role') }));

}
function* loadUserGroupDetails(action) {
    yield call(saga.handleAPIRequest, API.loadUserGroupwithUserId, action.payload.id);

}

function* updateUserGroupWithUserId(action) {
    let { userGroups } = action.payload.data;
    let userGroup = yield select(getUser);
    let { assignUserGroupList: { data } } = userGroup;
    let requestBody = formatCheckBoxesForAPI(userGroups, data);
    yield fork(saga.handleAPIRequest, API.updateUserGroupwithUserIds, { id: action.payload.id, requestBody });
    yield take(ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user_groups') }));

}

function* editUserBasicDetails(action) {
    yield fork(saga.handleAPIRequest, API.editUserBasicDetail, { id: action.payload.id, data: action.payload.data });
    yield take(ActionTypes.EDIT_USER_BASIC_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('basic_details') }));
}
//to get contact details
function* getContactDetails(action) {
    yield fork(saga.handleAPIRequest, API.getContactDetails, action.payload.id);
}
function* editUserContact(action) {
    yield fork(saga.handleAPIRequest, API.editContactDetails, action.payload);
    yield take(ActionTypes.EDIT_USER_CONTACT_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('contact') }));
}

function* getUserType() {
    yield fork(saga.handleAPIRequest, API.getUserType);
}

function* fetchAssignOrganizationForUsers() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER);

    let { additionalFilters, passedColumns } = additionalProps;
    let { userId, ...restAdditionalInfo } = additionalFilters;
    yield fork(saga.handleAPIRequest, API.fetchAssignOrganizationForUser, { params: { ...tableProps, ...restAdditionalInfo, langId }, userId });
    const userAssignOrgListAction = yield take([ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_SUCCESS, ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_FAILURE]);
    let userAssignOrgTableData = userAssignOrgListAction?.payload?.data?.data?.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userAssignOrgTableData);

    if (userAssignOrgListAction.type === ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, getPayloadData(userAssignOrgListAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, filterOptionsList: allFilterValues }));
    }

}
function* submitAssignOrganizationForUsers(action) {
    let { userId, assignOrgObj, defaultOrganizationId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateAssignOrganizationMapping, {
        userId,
        defaultOrganizationId,
        requestBody: assignOrgObj
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ORGANIZATION_UNDER_USER, selectedIds: [] }));
        yield put(Actions.fetchAssignOrganizationForUsers());
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('organization') }));
    }
}

function* fetchAssignRoleUnderUser() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER);

    let { additionalFilters, passedColumns } = additionalProps;
    let { userId, ...restAdditionalInfo } = additionalFilters;
    yield fork(saga.handleAPIRequest, API.fetchAssignRoleForUser, { params: { ...tableProps, ...restAdditionalInfo, langId }, userId });
    const userAssignRoleListAction = yield take([ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_FAILURE]);
    let userAssignOrgTableData = userAssignRoleListAction?.payload?.data?.data?.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userAssignOrgTableData);

    if (userAssignRoleListAction.type === ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, getPayloadData(userAssignRoleListAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, filterOptionsList: allFilterValues }));
    }
}

function* submitAssignRoleUnderUser(action) {
    let { userId, assignRoleObj } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateAssignRoleMapping, {
        userId,
        requestBody: assignRoleObj
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, selectedIds: [] }));
        yield put(Actions.fetchAssignRoleForUsers());
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('role') }));
    }
}

function* fetchAssignUserGroupUnderUser() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER);

    let { additionalFilters, passedColumns } = additionalProps;
    let { userId, ...restAdditionalInfo } = additionalFilters;
    yield fork(saga.handleAPIRequest, API.fetchAssignUserGroupForUser, { params: { ...tableProps, ...restAdditionalInfo, langId }, userId });
    const userAssignUserGroupListAction = yield take([ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_FAILURE]);
    let userAssignOrgTableData = userAssignUserGroupListAction?.payload?.data?.data?.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, userAssignOrgTableData);

    if (userAssignUserGroupListAction.type === ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER, getPayloadData(userAssignUserGroupListAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER, filterOptionsList: allFilterValues }));
    }
}

function* submitAssignUserGroupUnderUser(action) {
    let { userId, assignUserGroupObj } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.updateAssignUserGroupMapping, {
        userId,
        requestBody: assignUserGroupObj
    });
    const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_FAILURE]);
    if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER_SUCCESS) {
        yield put(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_USER_GROUP_UNDER_USER, selectedIds: [] }));
        yield put(Actions.fetchAssignUserGroupForUsers());
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user_groups') }));
    }
}

function* listGender() {
    const language = yield select(getDefaultLanguage);
    yield fork(saga.handleAPIRequest, API.loadGender, { params: { langId: language?.id } });
}

export default function* userSaga() {
    yield all([
        takeLatest(ActionTypes.ADD_USER, addUsers),
        takeLatest(ActionTypes.SEARCH_USER, searchUser),
        takeLatest(ActionTypes.DELETE_USER, deleteUser),
        takeLatest(ActionTypes.LIST_USER, listUsers),
        takeLatest(ActionTypes.GET_USER_BY_ID, getUserById),
        takeLatest(ActionTypes.UPDATE_USER, updateUser),
        takeLatest(ActionTypes.LIST_COUNTRY_CODE, listCountryCodes),
        takeLatest(ActionTypes.ADD_MULTIPLE_ORGANISATION, addMultipleOrganisation),
        takeLatest(ActionTypes.UPDATE_USER_ORGANISATION, updateUserOrganisation),
        takeLatest(ActionTypes.UPDATE_USER_ADDRESS, updateUserAddress),
        takeLatest(ActionTypes.GET_ADDRESS_OF_USER, getAddressOfUser),
        takeLatest(ActionTypes.EDIT_USER_CONTACT, editUserContact),
        takeLatest(ActionTypes.LOAD_ORGANISATION_DETAILS_WITH_USER_ID, loadOrganisationForUser),
        takeLatest(ActionTypes.LOAD_ROLE_DETAILS_WITH_USER_ID, loadRoleForUser),
        takeLatest(ActionTypes.LOAD_USER_GROUP_DETAILS_WITH_USER_ID, loadUserGroupDetails),
        takeLatest(ActionTypes.ASSIGN_ORGANISATION_FOR_USER_EDIT, updateOrganisationForUser),
        takeLatest(ActionTypes.ASSIGN_ROLE_FOR_USER_EDIT, updateRoleForUser),
        takeLatest(ActionTypes.UPDATE_USER_GROUP_WITH_USER_ID, updateUserGroupWithUserId),
        takeLatest(ActionTypes.EDIT_USER_BASIC_DETAILS, editUserBasicDetails),
        takeLatest(ActionTypes.GET_CONTACT_DETAILS, getContactDetails),
        takeLatest(ActionTypes.UPDATE_USER_ROLES, updateUserByRole),
        takeLatest(ActionTypes.UPDATE_USER_PASSWORD, updateUserPassword),
        takeLatest(ActionTypes.GET_USER_TYPE, getUserType),
        takeLatest(ActionTypes.LIST_GENDER, listGender),
        takeLatest(ActionTypes.FETCH_INITIAL_PAGEBLE_USERS, fetchInitialUsers),
        takeLatest(ActionTypes.LOAD_STATE, loadState),
        takeEvery(ActionTypes.LIST_DISTRICTS_FOR_ADDRESS, listDistricts),
        takeEvery(ActionTypes.FETCH_ASSIGN_ORGANIZATION_FOR_USERS, fetchAssignOrganizationForUsers),
        takeEvery(ActionTypes.SUBMIT_ASSIGN_ORGANIZATION_UNDER_USER, submitAssignOrganizationForUsers),
        takeEvery(ActionTypes.FETCH_ASSIGN_ROLE_UNDER_USER, fetchAssignRoleUnderUser),
        takeEvery(ActionTypes.SUBMIT_ASSIGN_ROLE_UNDER_USER, submitAssignRoleUnderUser),
        takeEvery(ActionTypes.FETCH_ASSIGN_USER_GROUP_UNDER_USER, fetchAssignUserGroupUnderUser),
        takeEvery(ActionTypes.SUBMIT_ASSIGN_USER_GROUP_UNDER_USER, submitAssignUserGroupUnderUser)


    ]);
}

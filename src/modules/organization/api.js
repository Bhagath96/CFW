import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listOrganization({ params }) {
  let payload = {
    types: [
      ActionTypes.LIST_ORGANISATION_REQUEST,
      ActionTypes.LIST_ORGANISATION_SUCCESS,
      ActionTypes.LIST_ORGANISATION_FAILURE
    ],
    params
  };
  return {
    url: URL.ORGANIZATION.LIST_ORGANISATION,
    api: restAPI.get,
    payload
  };
}
export function fetchOrganizationDetails({ organizationId = '' }) {
  let payload = {
    types: [
      ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST,
      ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS,
      ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.FETCH_ORGANIZATION.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.get,
    payload
  };
}

export function saveOrganization(data) {
  let payload = {
    types: [
      ActionTypes.SAVE_ORGANIZATION_REQUEST,
      ActionTypes.SAVE_ORGANIZATION_SUCCESS,
      ActionTypes.SAVE_ORGANIZATION_FAILED
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.SAVE_ORGANIZATION,
    api: restAPI.post,
    payload
  };
}

export function updateOrganization({ organizationId, data }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_ORGANIZATION_FAILED
    ],
    body: data
  };
  return {
    url: `${URL.ORGANIZATION.UPDATE_ORGANIZATION}/${organizationId}`,
    api: restAPI.put,
    payload
  };
}

export function deleteOrganization(id) {
  let payload = {
    types: [
      ActionTypes.DELETE_ORGANISATION_REQUEST,
      ActionTypes.DELETE_ORGANISATION_SUCCESS,
      ActionTypes.DELETE_ORGANISATION_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.DELETE_ORGANISATION.replace(':id', id),
    api: restAPI.del,
    payload
  };
}

export function loadParentOrganizations() {
  let payload = {
    types: [
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_REQUEST,
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_SUCCESS,
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_FAILED
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.PARENT_ORGANIZATIONS,
    api: restAPI.get,
    payload
  };
}

export function loadOrganizationTypes() {
  let payload = {
    types: [
      ActionTypes.LOAD_ORGANIZATION_TYPES_REQUEST,
      ActionTypes.LOAD_ORGANIZATION_TYPES_SUCCESS,
      ActionTypes.LOAD_ORGANIZATION_TYPES_FAILED
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.ORGANIZATIONS_TYPES,
    api: restAPI.get,
    payload
  };
}

export function loadLSGITypes({ body }) {
  let payload = {
    types: [
      ActionTypes.LOAD_LSGI_TYPES_REQUEST,
      ActionTypes.LOAD_LSGI_TYPES_SUCCESS,
      ActionTypes.LOAD_LSGI_TYPES_FAILED
    ],
    body,
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LOAD_LSGI_TYPES,
    api: restAPI.get,
    payload
  };
}
export function loadStates({ body }) {
  let payload = {
    types: [
      ActionTypes.ORGANIZATION_COMMON_STATE_REQUEST,
      ActionTypes.ORGANIZATION_COMMON_STATE_SUCCESS,
      ActionTypes.ORGANIZATION_COMMON_STATE_FAILURE
    ],
    body,
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LOAD_STATES,
    api: restAPI.get,
    payload
  };
}

export function loadDistricts({ stateId }) {
  let payload = {
    types: [
      ActionTypes.LOAD_DISTRICTS_REQUEST,
      ActionTypes.LOAD_DISTRICTS_SUCCESS,
      ActionTypes.LOAD_DISTRICTS_FAILURE
    ],
    params: { stateId, type: 'dropdown' }

  };
  return {
    url: URL.ORGANIZATION.LOAD_DISTRICTS,
    api: restAPI.get,
    payload
  };
}

export function loadBlockPanchayath({ districtId }) {
  let payload = {
    types: [
      ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_REQUEST,
      ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_SUCCESS,
      ActionTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_FAILURE
    ],
    params: { districtId: districtId, type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LOAD_BLOCK_PANCHAYATHS,
    api: restAPI.get,
    payload
  };
}

export function loadDistrictPanchayath({ districtId }) {
  let payload = {
    types: [
      ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_REQUEST,
      ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_SUCCESS,
      ActionTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_FAILURE
    ],
    params: { districtId: districtId, type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LOAD_DISTRICT_PANCHAYATHS,
    api: restAPI.get,
    payload
  };
}

export function loadLSGI(params) {
  let payload = {
    types: [
      ActionTypes.LOAD_LSGIS_REQUEST,
      ActionTypes.LOAD_LSGIS_SUCCESS,
      ActionTypes.LOAD_LSGIS_FAILURE
    ],
    params: { ...params, type: 'dropdown' }

  };
  return {
    url: URL.ORGANIZATION.LOAD_LSGI,
    api: restAPI.get,
    payload
  };
}

export function fetchOrganizationAssignUsers({ params, organizationId }) {
  let payload = {
    types: [ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_REQUEST, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.FETCH_USER_ORGANIZATION_MAPPING.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
}

export function updateUserOrganizationMapping({ organizationId, requestBody }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_FAILURE
    ],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.UPDATE_USER_ORGANIZATION_MAPPING.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.put,
    payload
  };
}

export function loadOrganizationRoleTypes(roleTypeId = 2) {
  let params = { type: 'dropdown' };
  let payload = {
    types: [
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_REQUEST,
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS,
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_FAILED
    ],
    params
  };
  return {
    url: URL.ORGANIZATION.ORGANIZATIONS_ROLE_TYPES.replace(
      ':roleTypeId',
      roleTypeId
    ),
    api: restAPI.get,
    payload
  };
}

export function fetchAssignRole({ params, organizationId, roleId }) {
  let payload = {
    types: [ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_REQUEST, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ROLE.replace(':orgId', organizationId).replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function submitAssignRoles({ organizationId, roleId, requestBody }) {
  let payload = {
    types: [ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_REQUEST, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_FAILURE],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ROLE.replace(':orgId', organizationId).replace(':roleId', roleId),
    api: restAPI.put,

    payload
  };
}

export function fetchModulesForChk(orgId) {
  let payload = {
    types: [
      ActionTypes.FETCH_MODULES_FOR_CHK_REQUEST,
      ActionTypes.FETCH_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.FETCH_MODULES_FOR_CHK_FAILURE
    ]
  };
  return {
    url: URL.ORG_MODULES.LIST_MODULES.replace(':organizationId', orgId),
    api: restAPI.get,
    payload
  };
}

export function fetchRolesList(Id = 2) {
  let payload = {
    types: [
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_REQUEST,
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_SUCCESS,
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_FAILURE
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ROLE.LIST_ORGANISATION_ROLE.replace(':roleTypeId', Id),
    api: restAPI.get,
    payload
  };
}

export function fetchAssignedModuleForCHK(data) {
  let payload = {
    types: [
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_REQUEST,
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_FAILURE
    ]
  };
  return {
    url: URL.ORG_MODULES.LIST_ASSIGNED_MODULES.replace(
      ':orgID',
      data.orgID
    ).replace(':roleId', '?roleId=' + data.roleId),
    api: restAPI.get,
    payload
  };
}
export function saveModules(Id, body) {
  let payload = {
    types: [
      ActionTypes.SAVE_MODULES_FOR_CHK_REQUEST,
      ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.SAVE_MODULES_FOR_CHK_FAILURE
    ],
    body
  };
  return {
    url: URL.ORG_MODULES.SAVE_MODULES.replace(':orgId', Id),
    api: restAPI.post,
    payload
  };
}

export function saveAssignedModules(orgId, roleId, body) {
  let payload = {
    types: [
      ActionTypes.SAVE_ASSIGNED_MODULES_REQUEST,
      ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS,
      ActionTypes.SAVE_ASSIGNED_MODULES_FAILURE
    ],
    body
  };
  return {
    url: URL.ORG_MODULES.SAVE_ASSIGNED_MODULES.replace(':orgId', orgId).replace(
      ':roleId',
      roleId
    ),
    api: restAPI.post,
    payload
  };
}


export function loadAPIProviders() {
  let payload = {
    types: [
      ActionTypes.LOAD_API_PROVIDERS_REQUEST,
      ActionTypes.LOAD_API_PROVIDERS_SUCCESS,
      ActionTypes.LOAD_API_PROVIDERS_FAILED
    ]
  };
  return {
    url: URL.ORGANIZATION.LOAD_PROVIDERS,
    api: restAPI.get,
    payload
  };
}
export function loadNotificationProviders(id, notificationProviders) {
  let payload = {
    types: [
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_REQUEST,
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_SUCCESS,
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.GET_NOTIFICATION_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', notificationProviders),
    api: restAPI.get,
    payload
  };
}

export function updateApiProviders(
  id = 0,
  data = {}
) {
  let payload = {
    types: [
      ActionTypes.UPDATE_API_PROVIDER_REQUEST,
      ActionTypes.UPDATE_API_PROVIDER_SUCCESS,
      ActionTypes.UPDATE_API_PROVIDER_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.UPDATE_API_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', data?.id),
    api: restAPI.put,
    payload
  };
}

export function postApiProviders(id = 0, apiProvider = {}) {
  let payload = {
    types: [
      ActionTypes.POST_API_PROVIDER_REQUEST,
      ActionTypes.POST_API_PROVIDER_SUCCESS,
      ActionTypes.POST_API_PROVIDER_FAILURE
    ],
    body: apiProvider
  };
  return {
    url: URL.ORGANIZATION.POST_API_PROVIDER.replace(':organizationId', id),
    api: restAPI.post,
    payload
  };
}

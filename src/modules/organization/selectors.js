import { STATE_REDUCER_KEY } from './constants';
import _ from '../../utils/LodashUtils';

export const getOrganization = state => state[STATE_REDUCER_KEY];

const organizationAddNew = (organization) => organization.addNew;
export const getOrganizationAddNew = _.flow(getOrganization, organizationAddNew);

const parentOrganizations = (organization) => organization.parentOrganizations;
export const getParentOrganizations = _.flow(getOrganization, parentOrganizations);

const organizationTypes = (organization) => organization.organizationTypes;
export const getOrganizationTypes = _.flow(getOrganization, organizationTypes);

const organizationRoleTypes = (organization) => organization.organizationRoleTypes;
export const getOrganizationRoleTypes = _.flow(getOrganization, organizationRoleTypes);

const apiProviders = (organization) => organization.apiProviders;
export const getApiProviders = _.flow(getOrganization, apiProviders);

const listOrganization = (organization) => organization.listOrganisation;
export const getOrganizationList = _.flow(getOrganization, listOrganization);

const filters = (organization) => organization.filters;
export const getFilters = _.flow(getOrganization, filters);

const selectedOrgInfo = (selected) => selected.organization;
export const getSelectedOrgInfo = _.flow(getOrganizationAddNew, selectedOrgInfo);

const assignUsersInfo = (organization) => organization.assignUsers;
export const getAssignUsersInfo = _.flow(getOrganization, assignUsersInfo);

const loadUserGroupAssignUsers = (organization) => organization.loadUserGroupAssignUsers;
export const getLoadUserGroupAssignUsers = _.flow(getOrganization, loadUserGroupAssignUsers);

const listService = (organization) => organization.listService;
export const getListService = _.flow(getOrganization, listService);

const organizationAssignedUsers = (organization) => organization.organizationAssignedUsers;
export const getOrganizationAssignUsersList = _.flow(getOrganization, organizationAssignedUsers);

const listServiceProviderById = (organization) => organization.serviceProviderById;
export const getserviceProviderTypeName = _.flow(getOrganization, listServiceProviderById);

const orgAssignCustomerToServiceWorker = common => common.assignCustomerToServiceWorker;
export const getOrganizationAssignGTList = _.flow(getOrganization, orgAssignCustomerToServiceWorker);

const vendors = common => common.listVendorDetails;
export const getVendors = _.flow(getOrganization, vendors);

const complaintEscalationList = organization => organization.listComplaintEscalation;
export const getComplaintEscalationList = _.flow(getOrganization, complaintEscalationList);

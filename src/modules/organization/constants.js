const STATE_REDUCER_KEY = 'organization';


//constant need to sen to backend to get gt based on wardId

const roleId = 5;
const superVisorRoleId = 40;
const serviceProviderTypeName = 'SA';

export { STATE_REDUCER_KEY, roleId, superVisorRoleId, serviceProviderTypeName };

export const API_TYPES = {
    EMAIL: 'Email',
    SMS: 'SMS',
    NOTIFICATION: 'Notification',
    PAYMENT: 'PaymentGateway'
};
export const TABLE_IDS = {
    LIST_ORGANIZATION: 'LIST_ORGANIZATION',
    LIST_SERVICE: 'LIST_SERVICE',
    LIST_VENDOR: 'LIST_VENDOR',
    ASSIGN_ORG_USERS: 'ASSIGN_ORG_USERS',
    ASSIGN_CUSTOMER_TO_SERVICE_WORKER: 'ASSIGN_CUSTOMER_TO_SERVICE_WORKER',
    ASSIGN_ORGANIZATION: 'ASSIGN_ORGANIZATION',
    ASSIGN_ROLE: 'ASSIGN_ROLE',
    COMPLAINT_EM: 'COMPLAINT_ESCALATION_MATRIX'

};

export const ORG_TYPE = {
    MCF: 'MCF',
    RRF: 'RRF',
    CKC: 'CKC',
    CKC_VENDOR: 'CKC-Vendor',
    VENDOR: 'Vendor',
    LSGI_VENDOR: 'LSGI-Vendor',
    GO_DOWN: 'Godown',
    CORPORATION: 'Corporation',
    MUNICIPALITY: 'Municipality',
    PANCHAYATH: 'Panchayath'

};

export const TAB_NAMES = ['Email', 'SMS', 'Notification', 'Payment gateway'];

const STATE_REDUCER_KEY = 'user-management';

const ADDRESS_TYPES = [
    { id: 1, name: 'Permanent' },
    { id: 2, name: 'Current' }
];

const TABLE_IDS = {
    LIST_USERS: 'LIST_USERS',
    LIST_ASSIGN_ORGANIZATION_UNDER_USER: 'LIST_ASSIGN_ORGANIZATION_UNDER_USER',
    LIST_ASSIGN_ROLE_UNDER_USER: 'LIST_ASSIGN_ROLE_UNDER_USER',
    LIST_ASSIGN_USER_GROUP_UNDER_USER: 'LIST_ASSIGN_USER_GROUP_UNDER_USER'
};

const Gender = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
    { id: 3, name: 'others' }
];

export { STATE_REDUCER_KEY, ADDRESS_TYPES, TABLE_IDS, Gender };

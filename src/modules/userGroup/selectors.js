import { STATE_REDUCER_KEY } from './constants';
import _ from '../../utils/LodashUtils';

export const getUserGroups = state => state[STATE_REDUCER_KEY];

const addUserGroup = (userGroup) => userGroup.editData;
const userGroup = user => user.listUserGroup;

export const getUserGroup = _.flow(getUserGroups, userGroup);

export const getAddUserGroup = _.flow(getUserGroups, addUserGroup);

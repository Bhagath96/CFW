import { STATE_REDUCER_KEY } from './constants';
import _ from '../../utils/LodashUtils';
import flow from 'lodash/fp/flow';

export const getUser = state => state[STATE_REDUCER_KEY];
const loadState = (state) => state.states;

const users = user => user.listUser;
export const getUsers = flow(getUser, users);
const assignOrg = user => user.assignOrganizationForUser;
export const getAssignOrg = flow(getUser, assignOrg);

export const loadFullState = _.flow(getUser, loadState);


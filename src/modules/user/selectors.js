import { STATE_REDUCER_KEY } from './constants';
import _ from '../../utils/LodashUtils';

export const getUser = state => state[STATE_REDUCER_KEY];

const userLogin = user => user.login;
export const getUserLogin = _.flow(getUser, userLogin);

const userAuthData = user => user.authData;
export const getUserAuthData = _.flow(getUser, userAuthData);

const userInfo = user => user.info;
export const getUserInfo = _.flow(getUser, userInfo);

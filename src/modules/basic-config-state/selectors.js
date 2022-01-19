import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getState = state => state[STATE_REDUCER_KEY];

const states = state => state.listStateDetails;
export const getStates = flow(getState, states);

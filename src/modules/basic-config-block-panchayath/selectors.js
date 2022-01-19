import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getBlockPanchayath = state => state[STATE_REDUCER_KEY];

const blockPanchayath = lsgi => lsgi.listBlockPanchayathDetails;
export const getBlockPanchayaths = flow(getBlockPanchayath, blockPanchayath);

import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getLsgi = state => state[STATE_REDUCER_KEY];

const lsgis = lsgi => lsgi.listLSGIDetails;
export const getLsgis = flow(getLsgi, lsgis);

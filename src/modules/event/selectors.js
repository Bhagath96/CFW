import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getEvent = state => state[STATE_REDUCER_KEY];

const events = state => state.listEventDetails;
export const getEvents = flow(getEvent, events);

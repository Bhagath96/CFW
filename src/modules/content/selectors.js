import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getContent = state => state[STATE_REDUCER_KEY];

const news = state => state.listContentDetails;
export const getAllContent = flow(getContent, news);

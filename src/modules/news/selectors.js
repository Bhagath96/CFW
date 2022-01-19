import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getNews = state => state[STATE_REDUCER_KEY];

const news = state => state.listNewsDetails;
export const getAllNews = flow(getNews, news);

import { STATE_REDUCER_KEY } from './constants';
import _ from 'lodash';

export const getCommon = state => state[STATE_REDUCER_KEY];

const language = (common) => common.defaultLanguage;
export const getDefaultLanguage = _.flow(getCommon, language);

const tableProps = common => common.tableProps;
export const getTableProps = _.flow(getCommon, tableProps);

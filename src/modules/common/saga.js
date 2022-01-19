import { takeLatest, all, call, put, select, fork, take } from 'redux-saga/effects';
import { types as ActionTypes, setTablePagination, setTableDropdownFilterList, setTableFilterChips } from './actions';
import { saga } from '../../common';
import * as API from './api';
import _ from 'lodash';
import { errorNotify, successNotify, infoNotify, warningNotify } from '../../utils/ReactReduxNotifyUtils';
import { MESSAGE_TYPES } from './constants';
import { getDefaultLanguage, getTableProps } from './selectors';
import { DEFAULT_TABLE_PROPS, RESPONSE_TYPE } from '../../common/constants';
import { getPayloadData, tableFilterDestructuringArray } from '../../utils/ApiUtils';

function* loadLanguages() {
    yield call(saga.handleAPIRequest, API.loadLanguages);
}

function* showNotification(action) {
    const { payload: { data: { message = '', duration = 3000, type = MESSAGE_TYPES.ERROR } } = {} } = action;
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            yield call(errorNotify, message, duration);
            break;
        case MESSAGE_TYPES.SUCCESS:
            yield call(successNotify, message, duration);
            break;
        case MESSAGE_TYPES.INFO:
            yield call(infoNotify, message, duration);
            break;
        case MESSAGE_TYPES.WARNING:
            yield call(warningNotify, message, duration);
            break;
        default:
            yield call(successNotify, message, duration);
            break;
    }
}

export function* getTableFiltersFromCommonStore(key) {
    const tableProps = yield select(getTableProps);
    let { pagination = DEFAULT_TABLE_PROPS, chips: filterChips = {} } = _.get(tableProps, `${key}`, {});
    let filterParams = {};
    if (!_.isEmpty(filterChips)) {
        filterParams = {
            filter: true,
            ...filterChips
        };
    }
    let response = { ...filterParams, ...pagination };
    return response;
}

export function* getTableAdditionalPropertiesFromCommonStore(key) {
    const tableProps = yield select(getTableProps);
    let { additionalFilters = {}, passedColumns = [], filterOptions = {}, initialfilterOptions = {} } = _.get(tableProps, `${key}`, {});
    return { additionalFilters, passedColumns, filterOptions, initialfilterOptions };
}

export function* setPaginationInCommonTableProps(key = 'DEFAULT', response = {}) {
    let pagination = {
        size: _.get(response, 'pageable.pageSize', 0),
        page: _.get(response, 'pageable.pageNumber', 0),
        count: _.get(response, 'totalElements', 0)
    };
    yield put(setTablePagination({ key, pagination }));
}

export function* fetchTableDropdownFilterList(action) {
    const { searchValue, searchKey, columnName, key, url } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchTableDropdownFilterList, { type: 'filterDropdownData', searchValue, searchKey, langId, url });
    const filterResponseAction = yield take([ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS, ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE]);
    if (filterResponseAction.type === ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS) {
        const response = getPayloadData(filterResponseAction.payload, []);
        yield put(setTableDropdownFilterList({ key, filterOptionsList: { [columnName]: response } }));
        yield put(setTableFilterChips({ key, chips: tableFilterDestructuringArray(response) }));
    }
}
function* listStates() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.loadStates, { langId, ...RESPONSE_TYPE.DROP_DOWN });
}
export default function* commonSaga() {
    yield all([
        takeLatest(ActionTypes.GET_ALL_LANGUAGES, loadLanguages),
        takeLatest(ActionTypes.SHOW_NOTIFICATION, showNotification),
        takeLatest(ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST, fetchTableDropdownFilterList),
        takeLatest(ActionTypes.LIST_STATES, listStates)
    ]);
}

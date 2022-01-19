import { action } from '../../common';

export const types = {
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    GET_ALL_LANGUAGES: 'GET_ALL_LANGUAGES',
    GET_ALL_LANGUAGES_REQUEST: 'GET_ALL_LANGUAGES_REQUEST',
    GET_ALL_LANGUAGES_SUCCESS: 'GET_ALL_LANGUAGES_SUCCESS',
    GET_ALL_LANGUAGES_FAILED: 'GET_ALL_LANGUAGES_FAILED',

    SET_PAGE_SIZE: 'SET_PAGE_SIZE',
    SHOW_NOTIFICATION: 'Common/SHOW_NOTIFICATION',
    SET_TABLE_PAGINATION: 'Common/SET_TABLE_PAGINATION',
    SET_TABLE_FILTER_CHIPS: 'Common/SET_TABLE_FILTER_CHIPS',
    SET_ADDITIONAL_TABLE_FILTERS: 'Common/SET_ADDITIONAL_TABLE_FILTERS',
    SET_TABLE_FILTER_OPTIONS_LIST: 'Common/SET_TABLE_FILTER_OPTIONS_LIST',
    RESET_TABLE_FILTER_OPTIONS_LIST: 'Common/RESET_TABLE_FILTER_OPTIONS_LIST',
    SET_TABLE_FILTER_STATE: 'Common/SET_TABLE_FILTER_STATE',
    SET_TABLE_SELECTED_IDS: 'Common/SET_TABLE_SELECTED_IDS',

    SET_PASSED_COLUMNS: 'Common/SET_PASSED_COLUMNS',

    FETCH_TABLE_FILTER_OPTIONS_LIST: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST',
    FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST',
    FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS',
    FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE',

    SET_FILTERS_TO_INITIAL_VALUES: 'Common/SET_FILTERS_TO_INITIAL_VALUES',
    RESET_FILTER_BASED_ON_KEY: 'Common/RESET_FILTER_BASED_ON_KEY',
    SET_FILTERS_TO_INITIAL_DROPDOWN_LIST: 'Common/SET_FILTERS_TO_INITIAL_DROPDOWN_LIST',
    SET_FILTER_VALUES_FROM_INITIAL_STATE: 'Common/SET_FILTER_VALUES_FROM_INITIAL_STATE',

    SET_BREAD_CRUMB_WITH_PATH: 'SET_BREAD_CRUMB_WITH_PATH',

    //for basicConfig
    LIST_STATES: 'BasicConfig/LIST_STATES',
    LIST_STATES_REQUEST: 'BasicConfig/LIST_STATES_REQUEST',
    LIST_STATES_SUCCESS: 'BasicConfig/LIST_STATES_SUCCESS',
    LIST_STATES_FAILURE: 'BasicConfig/LIST_STATES_FAILURE',
    CHECK_DRIVE_URL: 'Common/CHECK_DRIVE_URL',
    CLEAR_DRIVE_URL: 'Common/CLEAR_DRIVE_URL'


};

export const getAllLanguages = () => action(types.GET_ALL_LANGUAGES);

export const changeLanguage = (lang) => action(types.CHANGE_LANGUAGE, { lang });

export const setBreadCrumbObjWithPath = (data) => action(types.SET_BREAD_CRUMB_WITH_PATH, { data });

export const showNotification = (data) => action(types.SHOW_NOTIFICATION, { data });

export const fetchStateList = () => action(types.LIST_STATES);


/**
 * setTablePagination => Common action to set Page props in common store
 *
 * @param {Key:TableKey,pagination:{page,size,count}} data
 *
 * @returns
 */

export const setTablePagination = (data) => action(types.SET_TABLE_PAGINATION, { data });

/**
 * setTableFilterChips => Common action to set filter values in Common store
 *
 * @param {Key:TableKey,chips:{page,size,count}} data
 *
 * @returns
 */

export const setTableFilterChips = (data) => action(types.SET_TABLE_FILTER_CHIPS, { data });

/**
 * setAdditionalTableFilters => Common action to set Additional filter values in Common store
 *
 * @param {Key:TableKey,filters:{}} data
 *
 * @returns
 */

export const setAdditionalTableFilters = (data) => action(types.SET_ADDITIONAL_TABLE_FILTERS, { data });

export const fetchTableDropdownFilterList = (data) => action(types.FETCH_TABLE_FILTER_OPTIONS_LIST, { data });

export const setTableDropdownFilterList = (data) => action(types.SET_TABLE_FILTER_OPTIONS_LIST, { data });

export const resetTableDropdownFilterList = (data) => action(types.RESET_TABLE_FILTER_OPTIONS_LIST, { data });

export const setTableFilterState = (data) => action(types.SET_TABLE_FILTER_STATE, { data });

export const setSelectedIds = (data) => action(types.SET_TABLE_SELECTED_IDS, { data });

export const setPassedColumns = (data) => action(types.SET_PASSED_COLUMNS, { data });

export const resetFilter = (data) => action(types.RESET_FILTER_BASED_ON_KEY, { data });

export const setInitialFilterList = (data) => action(types.SET_FILTERS_TO_INITIAL_DROPDOWN_LIST, { data });

export const setFilterValuesFromInitialStates = (data) => action(types.SET_FILTER_VALUES_FROM_INITIAL_STATE, { data });

export const checkDriveUrl = (data) => action(types.CHECK_DRIVE_URL, { data });

export const clearDeriveUrlarray = (data) => action(types.CLEAR_DRIVE_URL, { data });

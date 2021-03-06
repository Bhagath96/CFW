import { action } from '../../common';
export const types = {
    FETCH_NEWS_DETAILS: 'News/FETCH_NEWS_DETAILS',
    FETCH_NEWS_DETAILS_REQUEST: 'News/FETCH_NEWS_DETAILS_REQUEST',
    FETCH_NEWS_DETAILS_SUCCESS: 'News/FETCH_NEWS_DETAILS_SUCCESS',
    FETCH_NEWS_DETAILS_FAILURE: 'News/FETCH_NEWS_DETAILS_FAILURE',

    FETCH_NEWS_DETAILS_BY_ID: 'News/FETCH_NEWS_DETAILS_BY_ID',
    FETCH_NEWS_DETAILS_BY_ID_REQUEST: 'News/FETCH_NEWS_DETAILS_BY_ID_REQUEST',
    FETCH_NEWS_DETAILS_BY_ID_SUCCESS: 'News/FETCH_NEWS_DETAILS_BY_ID_SUCCESS',
    FETCH_NEWS_DETAILS_BY_ID_FAILURE: 'News/FETCH_NEWS_DETAILS_BY_ID_FAILURE',

    SAVE_NEWS_DETAILS: 'News/SAVE_NEWS_DETAILS',
    SAVE_NEWS_DETAILS_REQUEST: 'News/SAVE_NEWS_DETAILS_REQUEST',
    SAVE_NEWS_DETAILS_SUCCESS: 'News/SAVE_NEWS_DETAILS_SUCCESS',
    SAVE_NEWS_DETAILS_FAILURE: 'News/SAVE_NEWS_DETAILS_FAILURE',

    GET_ROLE_FOR_NEWS: 'News/GET_ROLE_FOR_NEWS',
    GET_ROLE_FOR_NEWS_REQUEST: 'News/GET_ROLE_FOR_NEWS_REQUEST',
    GET_ROLE_FOR_NEWS_SUCCESS: 'News/GET_ROLE_FOR_NEWS_SUCCESS',
    GET_ROLE_FOR_NEWS_FAILURE: 'News/GET_ROLE_FOR_NEWS_FAILURE',

    GET_DEFAULT_ROLE_FOR_NEWS: 'News/GET_DEFAULT_ROLE_FOR_NEWS',
    GET_DEFAULT_ROLE_FOR_NEWS_REQUEST: 'News/GET_DEFAULT_ROLE_FOR_NEWS_REQUEST',
    GET_DEFAULT_ROLE_FOR_NEWS_SUCCESS: 'News/GET_DEFAULT_ROLE_FOR_NEWS_SUCCESS',
    GET_DEFAULT_ROLE_FOR_NEWS_FAILURE: 'News/GET_DEFAULT_ROLE_FOR_NEWS_FAILURE',

    GET_USER_GROUP_FOR_NEWS: 'News/GET_USER_GROUP_FOR_NEWS',
    GET_USER_GROUP_FOR_NEWS_REQUEST: 'News/GET_USER_GROUP_FOR_NEWS_REQUEST',
    GET_USER_GROUP_FOR_NEWS_SUCCESS: 'News/GET_USER_GROUP_FOR_NEWS_SUCCESS',
    GET_USER_GROUP_FOR_NEWS_FAILURE: 'News/GET_USER_GROUP_FOR_NEWS_FAILURE',

    GET_DEFAULT_USER_GROUP_FOR_NEWS: 'News/GET_DEFAULT-_USER_GROUP_FOR_NEWS',
    GET_DEFAULT_USER_GROUP_FOR_NEWS_REQUEST: 'News/GET_DEFAULT_USER_GROUP_FOR_NEWS_REQUEST',
    GET_DEFAULT_USER_GROUP_FOR_NEWS_SUCCESS: 'News/GET_DEFAULT_USER_GROUP_FOR_NEWS_SUCCESS',
    GET_DEFAULT_USER_GROUP_FOR_NEWS_FAILURE: 'News/GET_DEFAULT_USER_GROUP_FOR_NEWS_FAILURE',

    UPDATE_NEWS_DETAILS: 'News/UPDATE_NEWS_DETAILS',
    UPDATE_NEWS_DETAILS_REQUEST: 'News/UPDATE_NEWS_DETAILS_REQUEST',
    UPDATE_NEWS_DETAILS_SUCCESS: 'News/UPDATE_NEWS_DETAILS_SUCCESS',
    UPDATE_NEWS_DETAILS_FAILURE: 'News/UPDATE_NEWS_DETAILS_FAILURE',

    DELETE_NEWS_DETAILS: 'News/DELETE_NEWS_DETAILS',
    DELETE_NEWS_DETAILS_REQUEST: 'News/DELETE_NEWS_DETAILS_REQUEST',
    DELETE_NEWS_DETAILS_SUCCESS: 'News/DELETE_NEWS_DETAILS_SUCCESS',
    DELETE_NEWS_DETAILS_FAILURE: 'News/DELETE_NEWS_DETAILS_FAILURE',

    CLEAR_NEWS_DETAILS_REDUCER: 'News/CLEAR_NEWS_DETAILS_REDUCER',

    CHECK_URL: 'News/CHECK_URL',
    CHECK_URL_REQUEST: 'News/CHECK_URL_REQUEST',
    CHECK_URL_SUCCESS: 'News/CHECK_URL_SUCCESS',
    CHECK_URL_FAILURE: 'News/CHECK_URL_FAILURE'

};
export const fetchNewsDetails = (data) => action(types.FETCH_NEWS_DETAILS, { data });
export const saveNewsData = (data) => action(types.SAVE_NEWS_DETAILS, { data });
export const updatesNewsData = (data) => action(types.UPDATE_NEWS_DETAILS, { data });
export const deleteNewsData = (data, size, page) => action(types.DELETE_NEWS_DETAILS, { data, size, page });
export const fetchNewsDataById = (data) => action(types.FETCH_NEWS_DETAILS_BY_ID, { data });
export const clearNewsReducer = () => action(types.CLEAR_NEWS_DETAILS_REDUCER);
export const getAllRolesForNews = () => action(types.GET_ROLE_FOR_NEWS);

export const getDefaultRolesForNews = () => action(types.GET_DEFAULT_ROLE_FOR_NEWS);
export const getDefaultUserGroupForNews = () => action(types.GET_DEFAULT_USER_GROUP_FOR_NEWS);

export const getAllUserGroupForNews = () => action(types.GET_USER_GROUP_FOR_NEWS);

export const checkFileUrl = (data) => action(types.CHECK_URL, { data });



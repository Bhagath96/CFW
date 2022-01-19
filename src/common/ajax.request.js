import queryString from 'query-string';
import config from '../config';
import { URL } from './url';
import { I18n } from '../common/components';

const oktaAPIs = [URL.USER.AUTHENTICATE];
const requestBodyTypes = ['POST', 'PUT'];

function validateResponse(response) {
    if (!response.status) {
        return Promise.reject({ message: I18n.t('network_unavailable') });
    }
    if (response.status === 200) {
        return response.json().then(responseItem => {
            if (responseItem.access_token) {
                return Promise.resolve(responseItem);
            }
            if (responseItem.status_cd === 1) {
                return Promise.resolve(responseItem);
            }
            if (responseItem.status_cd === 0) {
                return Promise.reject(responseItem.error);
            }
            return Promise.reject({
                message: I18n.t('invalid_status_code', {
                    statusCode: responseItem.status_cd
                })
            });
        });
    }
    if (response.status === 401) {
        return response.json().then(json => {
            const rejectResponse = { message: json.error_description ? I18n.t('invalid_user_credentials') : json.error.message };
            if (json.error.error_cd) {
                // eslint-disable-next-line camelcase
                rejectResponse.error_cd = json.error.error_cd;
            }
            return Promise.reject(rejectResponse);
        });
    }
    return response.json().then(json => {
        return Promise.reject(json.error);
    });
}

function handleError(error) {
    if (error instanceof Promise) {
        return error
            .then(function (e) {
                return { error: e };
            }).catch(() => (
                { error: { message: I18n.t('unknown_error') } }));
    } else {
        return { error };
    }
}

function invoke(method, url, payload) {
    const defaultHeaders = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };
    let reqConfigData = {
        method,
        headers: Object.assign({}, defaultHeaders, payload.headers)
        // credentials: 'include'
    };
    if (requestBodyTypes.indexOf(method) !== -1) {
        reqConfigData.body = reqConfigData.headers['Content-Type'] === 'application/x-www-form-urlencoded'
            ? queryString.stringify(payload.body || {})
            : JSON.stringify(payload.body || {});
    }

    let endPointUrl = oktaAPIs.indexOf(url) === -1 ? config.apiServer.url : config.authServer.url;

    return fetch(`${endPointUrl}/${url}`, reqConfigData)
        .then(validateResponse)
        .then(response => ({ response }))
        .catch(handleError);
}

function invokeFormData(method, url, payload) {

    let reqConfigData = {
        method,
        headers: Object.assign({}, payload.headers),
        body: payload.body
    };
    let endPointUrl = oktaAPIs.indexOf(url) === -1 ? config.apiServer.url : config.authServer.url;

    return fetch(`${endPointUrl}/${url}`, reqConfigData)
        .then(validateResponse)
        .then(response => ({ response }))
        .catch(handleError);
}


export function post(url, payload) {

    return invoke('POST', url, payload);
}

export function postformData(url, payload) {

    return invokeFormData('POST', url, payload);
}

export function putformData(url, payload) {

    return invokeFormData('PUT', url, payload);
}

export function put(url, payload) {
    return invoke('PUT', url, payload);
}
export function del(url, payload) {
    let urlWithParams = payload.params ? `${url}?${queryString.stringify(payload.params, payload.options || {})}` : url;
    return invoke('DELETE', urlWithParams, payload);
}
export function get(url, payload) {
    let urlWithParams = payload.params ? `${url}?${queryString.stringify(payload.params, payload.options || {})}` : url;
    return invoke('GET', urlWithParams, payload);
}


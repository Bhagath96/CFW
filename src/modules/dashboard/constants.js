import { I18n } from '../../common/components';

export const STATE_REDUCER_KEY = 'dashboard';

export const getI18nDropdownSelected = (object = {}, key = null) => {
    let response = null;
    if (key) {
        response = { id: key, name: I18n.t(object[key]) };
    }
    return response;
};

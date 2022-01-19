import _ from 'lodash';
import { I18n } from '../../common/components';


export const addUserGroupValidation = values => {
    const errors = {};
    if (!_.has(values, 'addUserGroup.name') || _.get(values, 'addUserGroup.name', '').length < 1) {
        _.set(errors, 'addUserGroup.name', I18n.t('required', { type: I18n.t('group_name') }));
    }
    if (!_.has(values, 'addUserGroup.key') || _.get(values, 'addUserGroup.key', '').length < 1) {
        _.set(errors, 'addUserGroup.key', I18n.t('required', { type: I18n.t('group_key') }));
    }
    return errors;
};

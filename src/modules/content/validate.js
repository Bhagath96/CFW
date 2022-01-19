import { I18n } from '../../common/components';
import { getFieldIdFromUrl } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';
import { checkIfDuplicateExists } from '../../utils/ValidationUtils';


const createNewsValidation = values => {
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.labels || !values.labels.length) {
        errors.label = { _error: I18n.t('no_label_error') };
    }
    if (!_.has(values, 'roles') || _.get(values, 'roles', null) === null) {
        _.set(errors, 'roles', I18n.t('required', { type: I18n.t('roles') }));
    }
    if (!_.has(values, 'usergroups') || _.get(values, 'usergroups', null) === null) {
        _.set(errors, 'usergroups', I18n.t('required', { type: I18n.t('user_group') }));
    }
    if (!_.has(values, 'author') || _.get(values, 'author', null) === null) {
        _.set(errors, 'author', I18n.t('required', { type: I18n.t('author') }));
    }
    if (!_.has(values, 'sort') || _.get(values, 'sort', null) === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    if (!values.labels || !values.labels.length) {
        errors.labels = I18n.t('required', { type: I18n.t('label') });
    } else {
        const membersArrayErrors = [];
        values.labels.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (member.langId) {
                arrayForLanguages.push(Number(member.langId));
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.body) {
                memberErrors.body = I18n.t('required', { type: I18n.t('body') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.clicked) {
                memberErrors.body = I18n.t('validate_link');
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (member && member.body) {
                let fieldId = getFieldIdFromUrl(JSON.stringify(member?.body));
                if (!fieldId) {
                    memberErrors.body = I18n.t('incorrect_url');
                    membersArrayErrors[memberIndex] = memberErrors;
                }


            }
            if (arrayForLanguages.length > 0) {
                duplicateExistForLabel = checkIfDuplicateExists(arrayForLanguages);
            }
            if (duplicateExistForLabel === true && arrayForLanguages.length > 0) {
                memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }

        });
        if (membersArrayErrors.length) {
            errors.labels = membersArrayErrors;
        }
    }
    return errors;

};

export default createNewsValidation;

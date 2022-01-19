import { I18n } from '../../common/components';
import _ from '../../utils/LodashUtils';
import { checkIfDuplicateExists } from '../../utils/ValidationUtils';


export const createOrganizationTypeForm = (values) => {
    const errors = {};
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;
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
    if (!_.has(values, 'name') || _.get(values, 'name', null) === null) {
        _.set(errors, 'name', I18n.t('required', { type: I18n.t('name') }));
    }
    if (!_.has(values, 'sort') || _.get(values, 'sort', null) === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    return errors;
};

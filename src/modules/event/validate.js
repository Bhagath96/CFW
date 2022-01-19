import { I18n } from '../../common/components';
import _ from '../../utils/LodashUtils';
import { checkIfDuplicateExists } from '../../utils/ValidationUtils';
// import moment from 'moment';

const createEventValidation = values => {
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;
    const errors = {};
    if (!_.has(values, 'body') || _.get(values, 'body', null) === null) {
        _.set(errors, 'body', I18n.t('required', { type: I18n.t('body') }));
    }

    if (values?.eventTypeId?.id === 2) {
        if (!_.has(values, 'latitude') || _.get(values, 'latitude', null) === null) {
            _.set(errors, 'latitude', I18n.t('required', { type: I18n.t('latitude') }));
        }
        if (!_.has(values, 'longitude') || _.get(values, 'longitude', null) === null) {
            _.set(errors, 'longitude', I18n.t('required', { type: I18n.t('longitude') }));
        }
        if (!_.has(values, 'state') || _.get(values, 'state', null) === null) {
            _.set(errors, 'state', I18n.t('required', { type: I18n.t('state') }));
        }
        if (!_.has(values, 'district') || _.get(values, 'district', null) === null) {
            _.set(errors, 'district', I18n.t('required', { type: I18n.t('district') }));
        }
        if (!_.has(values, 'lsgiType') || _.get(values, 'lsgiType', null) === null) {
            _.set(errors, 'lsgiType', I18n.t('required', { type: I18n.t('lsgi_type') }));
        }
        if (!_.has(values, 'lsgi') || _.get(values, 'lsgi', null) === null) {
            _.set(errors, 'lsgi', I18n.t('required', { type: I18n.t('lsgi') }));
        }


    } else {
        if (!_.has(values, 'onlinePlatform') || _.get(values, 'onlinePlatform', null) === null) {
            _.set(errors, 'onlinePlatform', I18n.t('required', { type: I18n.t('online_Platforms') }));
        }
        if (!_.has(values, 'onlineMeetLink') || _.get(values, 'onlineMeetLink', null) === null) {
            _.set(errors, 'onlineMeetLink', I18n.t('required', { type: I18n.t('link') }));
        }
    }
    if (!_.has(values, 'roles') || _.get(values, 'roles', []).length === 0) {
        _.set(errors, 'roles', I18n.t('required', { type: I18n.t('validation_roles') }));
    }
    if (!_.has(values, 'eventTypeId') || _.get(values, 'eventTypeId', []).length === 0) {
        _.set(errors, 'eventTypeId', I18n.t('required', { type: I18n.t('eventTypeId') }));
    }
    // if (!_.has(values, 'photoId') || _.get(values, 'photoId', null) === null) {
    //     _.set(errors, 'photoId', I18n.t('required', { type: I18n.t('file_upload') }));
    // }

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
            if (values?.eventTypeId?.id === 2) {
                if (!member || !member.locationName) {
                    memberErrors.locationName = I18n.t('required', { type: I18n.t('location_name') });
                    membersArrayErrors[memberIndex] = memberErrors;
                }
            }
            if (!member || !member.body) {
                memberErrors.body = I18n.t('required', { type: I18n.t('body') });
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
    return errors;

};

export default createEventValidation;

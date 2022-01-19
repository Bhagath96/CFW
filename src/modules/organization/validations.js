import { I18n } from '../../common/components';
import { isDouble } from '../../utils/ValidationUtils';
import _ from 'lodash';

export const validateAdditionalDetails = (values) => {
    const errors = {};

    if (!_.has(values, 'ward') || _.get(values, 'ward.id', null) === null) {
        _.set(errors, 'ward', I18n.t('required', { type: I18n.t('ward') }));
    }

    let latitude = _.get(values, 'latitude', null);
    if (!_.has(values, 'latitude') || latitude === null) {
        _.set(errors, 'latitude', I18n.t('required', { type: I18n.t('latitude') }));
    } else {
        if (!isDouble(latitude)) {
            _.set(errors, 'latitude', I18n.t('decimal_numbers_only'));
        }
    }

    let longitude = _.get(values, 'longitude', null);
    if (!_.has(values, 'longitude') || longitude === null) {
        _.set(errors, 'longitude', I18n.t('required', { type: I18n.t('longitude') }));
    } else {
        if (!isDouble(longitude)) {
            _.set(errors, 'longitude', I18n.t('decimal_numbers_only'));
        }
    }
    return errors;
};

export const AddOrganizationValidation = values => {
    const errors = {};
    if (!_.has(values, 'organization.name') || _.get(values, 'organization.name', '').length < 1) {
        _.set(errors, 'organization.name', I18n.t('required', { type: I18n.t('organization_name') }));
    }
    if (!_.has(values, 'organization.code') || (_.get(values, 'organization.code', '').length < 1)) {
        _.set(errors, 'organization.code', I18n.t('required', { type: I18n.t('organization_code') }));
    } else if (!/^[a-zA-Z0-9]{3,3}$/.test(_.get(values, 'organization.code', ''))) {
        _.set(errors, 'organization.code', `${I18n.t('not_valid', { type: I18n.t('organization_code') })} , ${I18n.t('length_should_be', { count: 3 })} `);
    }
    if (!_.has(values, 'organization.organizationType')) {
        _.set(errors, 'organization.organizationType', I18n.t('required', { type: I18n.t('organization_type') }));
    }
    if (!_.has(values, 'organization.state')) {
        _.set(errors, 'organization.state', I18n.t('required', { type: I18n.t('state') }));
    }

    let labels = _.get(values, 'organization.labels', []);
    _.forEach(labels, (item, index) => {
        let response = _.filter(labels, { langId: item.langId });
        if (response.length > 1) {
            _.set(errors, `organization.labels[${index}].langId`, I18n.t('language_should_not_be_same'));
        }
    });
    const membersArrayErrors = [];
    values?.organization?.labels?.forEach((member, memberIndex) => {
        const memberErrors = {};
        if (!member || !member.langId) {
            memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
            membersArrayErrors[memberIndex] = memberErrors;
        }
        if (!member || !member.label) {
            memberErrors.label = I18n.t('required', { type: I18n.t('label') });
            membersArrayErrors[memberIndex] = memberErrors;
        }

    });
    if (membersArrayErrors.length) {
        errors.organization.labels = membersArrayErrors;
    }
    return errors;

};

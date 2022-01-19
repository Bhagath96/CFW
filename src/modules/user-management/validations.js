import { I18n } from '../../common/components';
import _ from 'lodash';
import { isEmail, isLetters, max, min } from '../../utils/ValidationUtils';
import moment from 'moment';


export const addContactValidation = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = I18n.t('please_enter_email_addr');
    } else if (!isEmail(values.email)) {
        errors.email = I18n.t('please_enter_valid_email_addr');
    }
    if (!values.mobile) {
        errors.mobile = I18n.t('please_enter_phone_number');
    } else if (isNaN(Number(values.mobile))) {
        errors.mobile = I18n.t('is_not_valid');
    } else if (min(values.mobile, 10)) {
        errors.mobile = I18n.t('please_enter_valid_phone_number');
    } else if (max(values.mobile, 10)) {
        errors.mobile = I18n.t('please_enter_valid_phone_number');
    }
    if (_.get(values, 'country.id', null) === null) {
        _.set(errors, 'country', I18n.t('required', { type: I18n.t('country') }));
    }

    if (values.atlernativeMobile) {
        if (isNaN(Number(values.atlernativeMobile))) {
            errors.atlernativeMobile = I18n.t('is_not_valid');
        } else if (min(values.atlernativeMobile, 10)) {
            errors.atlernativeMobile = I18n.t('please_enter_valid_phone_number');
        } else if (max(values.atlernativeMobile, 10)) {
            errors.atlernativeMobile = I18n.t('please_enter_valid_phone_number');
        }
        if (_.get(values, 'altCountry.id', null) === null) {
            _.set(errors, 'altCountry', I18n.t('required', { type: I18n.t('country') }));
        }
    }
    return errors;
};

export const addPasswordSchema = (values) => {
    const errors = {};
    const { password, confirmPassword } = values;
    if (!password) {
        errors.password = I18n.t('required', { type: I18n.t('password') });
    } else if (min(password, 8)) {
        errors.password = I18n.t('length_should_be_atleast', { count: '8' });
    } else if (max(password, 20)) {
        errors.password = I18n.t('length_error', { size: '20', type: I18n.t('password') });
    }
    if (!confirmPassword) {
        errors.confirmPassword = I18n.t('required', { type: I18n.t('confirm_password') });
    } else if (password !== confirmPassword) {
        errors.confirmPassword = I18n.t('passwords_do_not_match');
    }
    return errors;
};
export const addUserValidation = (values) => {
    const errors = {};
    if (!values.username || values.username.length < 1) {
        errors.username = I18n.t('required', { type: I18n.t('user_name') });
    } else if (!isLetters(values.username)) {
        errors.username = I18n.t('this_username_format_is_not_valid');
    } else if (values.username.length > 11) {
        errors.username = I18n.t('username_length_exceeded');

    }
    if (!values.firstName) {
        errors.firstName = I18n.t('required', { type: I18n.t('first_name_validation') });
    }
    if (!values.lastName) {
        errors.lastName = I18n.t('required', { type: I18n.t('last_name_validation') });
    }
    if (!values.userTypeResponse) {
        errors.userTypeResponse = I18n.t('required', { type: I18n.t('user_type') });
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = I18n.t('required', { type: I18n.t('date_of_birth') });
    } else {
        const day = moment(values.dateOfBirth, 'yyyy-MM-DD');
        const today = moment().subtract(18, 'year');
        const futureDate = day.isAfter(today);
        if (futureDate) {
            errors.dateOfBirth = I18n.t('not_valid', { type: I18n.t('date_of_birth') });
        }
    }
    if (!values.password) {
        errors.password = I18n.t('required', { type: I18n.t('password') });
    } else if (values.password?.length < 6) {
        errors.password = I18n.t('required', { type: I18n.t('character'), count: 6 });
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = I18n.t('passwords_do_not_match');
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = I18n.t('please_enter_new_password');
    }
    return errors;
};

export const AssignUsersFormValidation = (values) => {
    const errors = {};
    if (!values.defaultOrganization || values.defaultOrganization?.id === null) {
        errors.defaultOrganization = I18n.t('required', { type: I18n.t('default_organization') });
    }
    return errors;
};

export const updateAddressValidation = (values) => {
    const errors = {};
    if (!values.permanentAddress?.addressLine1) {
        _.set(errors, 'permanentAddress.addressLine1', I18n.t('required', { type: I18n.t('permanent_address') }));
    }
    if (!values.permanentAddress?.addressLine2) {
        _.set(errors, 'permanentAddress.addressLine2', I18n.t('required', { type: I18n.t('permanent_address') }));
    }

    if (!values.sameAddress) {
        if (!values.currentAddress?.addressline1) {
            _.set(errors, 'currentAddress.addressline1', I18n.t('required', { type: I18n.t('current_address') }));
        }
        if (!values.currentAddress?.addressline2) {
            _.set(errors, 'currentAddress.addressline2', I18n.t('required', { type: I18n.t('current_address') }));
        }
    }
    return errors;
};

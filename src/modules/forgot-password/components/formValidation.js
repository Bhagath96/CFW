import { I18n } from '../../../common/components';

const isText = RegExp(/^[A-Z ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/); // us
const isNumber = RegExp(/^\d+$/);

export default function formValidation(name, value, schema) {
    const { validate, minLength, maxLength } = schema[name];
    let error = '';

    if (minLength && value.length < minLength) {
        error = I18n.t('minimum_required', { count: minLength, type: 'characters' });
    } else if (maxLength && value.length > 10) {
        error = I18n.t('maximum_required', { count: '10', type: 'characters' });
    } else if (maxLength && value.length < 10) {
        error = I18n.t('length_should_be', { count: 10 });
    }
    if (!validate) {
        return;
    }

    switch (validate) {
        case 'text':
            if (!isText.test(value)) {
                error = I18n.t('text_only_message');
            }
            break;

        case 'number':
            if (!isNumber.test(value)) {
                error = I18n.t('number_only_message');
            }
            break;

        case 'email':
            if (!isEmail.test(value)) {
                error = I18n.t('please_enter_valid_email_addr');
            }
            break;

        // case 'phone':
        //     if (!isPhone.test(value)) {
        //         error = 'Please enter a valid phone number. i.e: xxxxxxxxx  ';
        //     }
        //     break;

        case 'zip':
            if (!isZip.test(value)) {
                error = I18n.t('please_enter_valid_zip_code');
            }
            break;

        case 'checkbox':
            if (!value) {
                error = I18n.t('please_select_value');
            }
            break;

        default:
            break;
    }

    return error;
}

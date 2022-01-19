import { I18n } from '../../common/components';

export const editRoleView = (values) => {
    const errors = {};
    if (!values.roleType) {
        errors.roleType = I18n.t('required', { type: I18n.t('role_type') });
    }
    if (!values.title) {
        errors.title = I18n.t('required', { type: I18n.t('title') });
    }
    if (!values.description) {
        errors.description = I18n.t('required', { type: I18n.t('description') });
    }
    return errors;
};

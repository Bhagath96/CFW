export const changePasswordValidation = (values) => {
    const errors = {};
    if (!values.oldPassword) {
        errors.oldPassword = 'Old Password Required';
    }
    if (!values.password) {
        errors.password = ' New Password Required';
    } else if (values.password === values.oldPassword) {
        errors.password = 'Old and new password should not be same';
    }

    return errors;
};


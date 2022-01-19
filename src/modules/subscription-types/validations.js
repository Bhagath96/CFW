import { I18n } from '../../common/components';
import _ from '../../utils/LodashUtils';
import { isYoutubeUrl, isUrl } from '../../utils/ValidationUtils';
import isBase64 from 'is-base64';
import { YOUTUBE_API_KEY } from '../../common/constants';

const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};
function isFileImage(file) {
    const acceptedImageTypes = ['image/svg', 'image/jpeg', 'image/png', 'image/jpg'];
    return file && acceptedImageTypes.includes(file.type);
}


export const asyncHomePostValidation = (values) => {

    let link = _.get(values, 'youtubeId', '');
    if (link === null) {
        return Promise.resolve();
    } else {
        let embedId = link?.split('=');
        link = embedId?.[embedId?.length - 1];
        embedId = link?.split('/');
        let id = embedId?.[embedId.length - 1];
        return fetch(`https://youtube.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}`)
            .then(data => data.json())
            .then(res => {
                if (_.get(res, 'pageInfo.totalResults', 0) === 0) {
                    throw { youtubeId: I18n.t('not_valid', { type: I18n.t('youtube_url') }) };
                }
            }).catch((e) => {
                if (link?.length > 0) {
                    throw e || { youtubeId: I18n.t('not_valid', { type: I18n.t('youtube_url') }) };
                } else {
                    throw {};
                }
            });
    }

};
const subscriptionTypeValidation = values => {
    // let newArray = [];
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.labels || !values.labels.length) {
        errors.label = { _error: I18n.t('no_label_error') };
    }
    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    } else if (values.name?.length > 20) {
        errors.name = I18n.t('length_error', { type: I18n.t('name'), size: 20 });
    } else if (!/^[a-zA-Z0-9]*$/.test(values.name)) {
        errors.name = I18n.t('no_whitespace');
    }
    if (!values.icon) {
        errors.icon = I18n.t('required', { type: I18n.t('icon') });
    } else if (!isBase64(values.icon)) {
        errors.icon = I18n.t('required', { type: I18n.t('base64') });
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

export const homePostValidation = values => {
    // let newArray = [];
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.labels || !values.labels.length) {
        errors.label = { _error: I18n.t('no_label_error') };
    }

    if (!values.youtubeId && !values.photo) {
        if (!values.youtubeId) {
            errors.youtubeId = I18n.t('required', { type: I18n.t('youtube_url') });
        } else if (!values.photo) {
            errors.photo = I18n.t('required', { type: I18n.t('picture') });
        }
    } else if (values?.photo?.length > 0) {
        if (!isUrl(values.photo)) {
            let image = _.get(values, 'photo.0', {});
            if (!isFileImage(image)) {
                errors.photo = I18n.t('allowed_files', { types: I18n.t('image_types') });
            }
        }
    } else if (values?.youtubeId?.length > 0) {
        if (!isYoutubeUrl(values.youtubeId)) {
            errors.youtubeId = I18n.t('required', { type: I18n.t('youtube_url') });
        }
    }

    if (!_.has(values, 'sort') || _.get(values, 'sort', null) === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    if (!_.has(values, 'roles') || _.get(values, 'roles.0.id', null) === null) {
        _.set(errors, 'roles', I18n.t('required', { type: I18n.t('roles') }));
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
            if (!member || !member.title) {
                memberErrors.title = I18n.t('required', { type: I18n.t('title') });
                membersArrayErrors[memberIndex] = memberErrors;
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
export default subscriptionTypeValidation;

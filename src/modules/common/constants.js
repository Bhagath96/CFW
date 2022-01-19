import { I18n } from '../../common/components';

export const STATE_REDUCER_KEY = 'common';

export const SetDefaultLanguageID = (language) => {
    switch (language) {
        case 'en-IN':
            return 1;
        case 'ml-IN':
            return 2;
        case 'mr-IN':
            return 3;
        default:
            return 1;
    }
};

export const DEFAULT_LANGUAGE = { id: SetDefaultLanguageID(I18n.language), locale: I18n.language };

export const PICKY_EMPTY = { id: null, name: 'drop_down_select' };

export const MESSAGE_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success'
};
export const HIERARCHY_INDEX = {
    state: 0,
    district: 1,
    lsgiType: 2,
    blockPanchayath: 3,
    districtPanchayath: 3,
    lsgi: 4
};
export const STATE_VALUE = { id: 2, name: 'Kerala' };

export const DRIVE_API_END_POINT = 'https://www.googleapis.com/drive/v3/files';

export const API_KEYS = 'AIzaSyC1vQZyrnN_F_0VKFCh75xdoWtfowVyyBU';

export const GOOGLE_DRIVE_API_AUTH_SCOPE = 'https://www.googleapis.com/auth/drive';

export const MIME_TYPES = {
    PDF: 'application/pdf',
    PNG: 'image/png',
    JPG: 'image/jpg',
    JPEG: 'image/jpeg'
};


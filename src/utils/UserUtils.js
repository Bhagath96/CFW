import { ADMIN_ROLES } from '../common/constants';

export function getDefaultOrganization(userInfo = {}) {
    const { defaultOrganization } = userInfo;
    if (defaultOrganization) {
        return defaultOrganization;
    }
    return undefined;
}

export const isSuperAdmin = (roles = []) => {
    let response = false;
    roles.forEach(role => {
        if (ADMIN_ROLES.includes(role.key)) {
            response = true;
            return;
        }
    });
    return response;
};

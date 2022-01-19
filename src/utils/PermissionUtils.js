import _ from './LodashUtils';
import { getKeyByValue } from './ApiUtils';
import { RESOURCE_MAPPING } from '../common/constants';
import { store } from '../redux/store';

export const formatPermission = (roles = []) => {
    let roleDetails = {};
    _.forEach(roles, (role) => {
        _.forEach(role.resourcePermissions, (permission) => {
            let { resource = {}, actionIds } = permission;
            if (!_.has(roleDetails, getKeyByValue(RESOURCE_MAPPING, resource.name))) {
                _.set(roleDetails, getKeyByValue(RESOURCE_MAPPING, resource.name), { resourceActions: _.get(resource, 'resourceActions', []), actionIds: [actionIds] });
            } else {
                _.set(roleDetails, `${getKeyByValue(RESOURCE_MAPPING, resource.name)}.actionIds`, [..._.get(roleDetails, `${getKeyByValue(RESOURCE_MAPPING, resource.name)}.actionIds`), actionIds]);
            }
        });
    });
    return roleDetails;
};

const checkPermissions = (user, resourceName, resourceActionId) => {
    let userRoles = _.get(user, 'user.userRoles', []);
    let { actionIds = [], resourceActions = [] } = _.get(userRoles, getKeyByValue(RESOURCE_MAPPING, resourceName), {});
    let currentAction = _.find(resourceActions, ['actionId', resourceActionId]) || null;
    if (actionIds.length < 1 || resourceActions.length < 1 || currentAction === null) {
        return false;
    } else {
        return actionIds.some((action) => (action & currentAction.bitwiseValue) > 0);
    }
};

export const hasAccessPermission = (resourceName, resourceActionId) => {
    let user = store.getState();
    return checkPermissions(user, resourceName, resourceActionId);
};

export const SubMenuAccessPermissions = (user, resourceName, resourceActionId) => {
    return checkPermissions(user, resourceName, resourceActionId);
};

export const menuAccessPermissions = (user, resourceName = [], resourceActionId) => {
    let response = false;
    _.forEach(resourceName, resource => {
        if (checkPermissions(user, resource, resourceActionId)) {
            response = true;
            return;
        }
    });
    return response;
};

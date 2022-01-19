import _ from 'lodash';
import configs from '../configs';

export const getProjectProps = (type) => {
    // eslint-disable-next-line no-undef
    return _.get(configs, `${ENV_MODE.PROJECT}.${type}.${ENV_MODE.MODE}`, {});
};

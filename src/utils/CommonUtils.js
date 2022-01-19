import { I18n } from '../common/components';
import { PICKY_EMPTY } from '../modules/common/constants';
import { isNumber } from './ValidationUtils';

export const toNumber = (str = '') => {
    return isNumber(str) ? Number(str) : str;
};

export const getEmptyPicky = () => ({ id: PICKY_EMPTY.id, name: I18n.t(PICKY_EMPTY.name) });

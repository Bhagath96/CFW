import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getOrganizationType = state => state[STATE_REDUCER_KEY];

const organizationType = organization => organization.listOrganizationType;
export const getOrganizationTypes = flow(getOrganizationType, organizationType);

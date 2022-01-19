import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

export const getComplaintConfig = state => state[STATE_REDUCER_KEY];


const complaintServiceConfigDetails = complaintServiceConfig => complaintServiceConfig.listComplaintConfig;
export const getComplaintConfigs = flow(getComplaintConfig, complaintServiceConfigDetails);

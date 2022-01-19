import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getComplaint = state => state[STATE_REDUCER_KEY];

const complaint = state => state.listComplaintDetails;
export const getComplaintList = flow(getComplaint, complaint);

const assignServiceWorkerModal = state => state.assignServiceWorkerModal;
export const getAssignServiceWorkerComplaintInitialValues = flow(getComplaint, assignServiceWorkerModal);

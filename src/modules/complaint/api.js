import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchComplaintDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_COMPLAINT_DETAILS_REQUEST, ActionTypes.FETCH_COMPLAINT_DETAILS_SUCCESS, ActionTypes.FETCH_COMPLAINT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.COMPLAINT.LIST_COMPLAINT,
        api: restAPI.get,
        payload
    };
}

export function assignComplaintsServiceWorker(request) {
    let { complaintId, serviceProviderId, supervisorId, serviceWorkerId } = request;
    let payload = {
        types: [ActionTypes.ASSIGN_SERVICE_WORKER_REQUEST, ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]
    };
    return {
        url: URL.COMPLAINT.ASSIGN_SERVICE_WORKER
            .replace(':complaintId', complaintId)
            .replace(':serviceProviderId', serviceProviderId)
            .replace(':supervisorId', supervisorId)
            .replace(':serviceWorkerId', serviceWorkerId),
        api: restAPI.put,
        payload
    };
}

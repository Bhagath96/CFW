import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getSubscriptionType = state => state[STATE_REDUCER_KEY];

const subscriptionTypes = state => state.listSubscriptionTypeDetails;
export const getSubscriptionTypes = flow(getSubscriptionType, subscriptionTypes);

const homePosts = state => state.listHomePosts;
export const getHomePosts = flow(getSubscriptionType, homePosts);

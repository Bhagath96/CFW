import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

const getDashboard = state => state[STATE_REDUCER_KEY];

const config = (dashboard) => (dashboard.config);
export const getConfig = flow(getDashboard, config);

const chartData = (dashboard) => (dashboard.chartData);
export const getChartData = flow(getDashboard, chartData);

const customerCount = (dashboard) => (dashboard.customerCount);
export const getCustomerCount = flow(getDashboard, customerCount);

const serviceCount = (dashboard) => (dashboard.serviceCount);
export const getServiceCount = flow(getDashboard, serviceCount);

const filters = (dashboard) => (dashboard.filters);
export const getDashboardFilters = flow(getDashboard, filters);

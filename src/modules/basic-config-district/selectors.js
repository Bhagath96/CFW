import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getDistrict = state => state[STATE_REDUCER_KEY];

const districts = district => district.listDistrictDetails;
export const getDistricts = flow(getDistrict, districts);

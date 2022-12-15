import { APIService } from "../../../config/api/apiConfig";

import {
  addViewBranchesLoading, addViewBranchesSuccess, getBranchLoading,
  getBranchSuccess, getViewBranchesLoading,
  getViewBranchesSuccess, getViewBranchesTopLoading, getViewBranchesTopSuccess
} from "./branches.creator";



export const getBranches = (clientId, startDate, endDate) => async (dispatch) => {


  dispatch(getViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);
    console.log("This is GetBranches response data", response.data);

    dispatch(getViewBranchesSuccess(response.data.authenticatedData));
    dispatch(getViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getBranchesTop = (clientId, startDate, endDate) => async (dispatch) => {


  dispatch(getViewBranchesTopLoading(true));

  const requestUrl = `/cadmin/branches-sum/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getViewBranchesTopSuccess(response.data.authenticatedData));
    dispatch(getViewBranchesTopLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesTopLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addABranch = (parameters = {}) => async (dispatch) => {

  dispatch(addViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    console.log('this is the response from adding branch');
    dispatch(addViewBranchesSuccess(response.data));
    console.log(response.data);
    dispatch(addViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


export const getABranch = (branch_id, startDate, endDate) => async (dispatch) => {


  dispatch(getBranchLoading(true));

  const requestUrl = `/cadmin/branch/${branch_id}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getBranchSuccess(response.data.authenticatedData));
    dispatch(getBranchLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getBranchLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

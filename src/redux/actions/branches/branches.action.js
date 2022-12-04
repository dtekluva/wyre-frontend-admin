import { APIService } from "../../../config/api/apiConfig";

import { addViewBranchesLoading, addViewBranchesSuccess, getViewBranchesLoading, getViewBranchesSuccess, getViewBranchesTopLoading, getViewBranchesTopSuccess } from "./branches.creator";



export const getBranches = (clientId, startDate, endDate) => async (dispatch) => {
  

  dispatch(getViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getViewBranchesSuccess(response.data.authenticatedData));
    console.log("get-branches data here>>>>>>>>>>>>>>>>>>>>>>",response.data.authenticatedData);
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
    console.log("this the top head value============>>>>>>>",response.data.authenticatedData);
    dispatch(getViewBranchesTopLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesTopLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addABranch = (parameters={}) => async (dispatch) => {

  dispatch(addViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addViewBranchesSuccess(response.data));
    console.log(response.data);
    dispatch(addViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

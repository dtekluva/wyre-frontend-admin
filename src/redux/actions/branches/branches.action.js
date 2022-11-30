import { APIService } from "../../../config/api/apiConfig";

import { addViewBranchesLoading, addViewBranchesSuccess, getViewBranchesLoading, getViewBranchesSuccess } from "./branches.creator";



export const getBranches = (startDate, endDate) => async (dispatch) => {
  

  dispatch(getViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getViewBranchesSuccess(response.data.authenticatedData));
    console.log(response.data.authenticatedData);
    dispatch(getViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addABranch = (parameters={}) => async (dispatch) => {

  dispatch(addViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/`;
  try {
    // const response = await APIService.post(requestUrl, parameters);

    // dispatch(addViewBranchesSuccess(response.data));
    dispatch(addViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

import { APIService } from "../../../config/api/apiConfig";

import { addViewBranchesLoading, addViewBranchesSuccess, getViewBranchesLoading, getViewBranchesSuccess } from "./viewBranches.creator";



export const getViewBranches = (parameters={}) => async (dispatch) => {

  dispatch(getViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getViewBranchesSuccess(response.data));
    window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(getViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addAViewBranch = (parameters={}) => async (dispatch) => {

  console.log('===================================>>>>>>>>>', parameters)
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

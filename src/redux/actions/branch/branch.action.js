import { APIService } from "../../../config/api/apiConfig";

import { getBranchLoading, getBranchSuccess } from "./branch.creator";

export const getBranch = (clientId, branch_id, startDate, endDate) => async (dispatch) => {
  

  dispatch(getBranchLoading(true));

  const requestUrl = `/cadmin/branches/${clientId.branch_id}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getBranchSuccess(response.data.authenticatedData));
    console.log("get-branches data here>>>>>>>>>>>>>>>>>>>>>>",response.data.authenticatedData);
    dispatch(getBranchLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getBranchLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

// export const addABranch = (parameters={}) => async (dispatch) => {

//   dispatch(addViewBranchesLoading(true));

//   const requestUrl = `/cadmin/branches/`;
//   try {
//     const response = await APIService.post(requestUrl, parameters);

//     dispatch(addViewBranchesSuccess(response.data));
//     console.log(response.data);
//     dispatch(addViewBranchesLoading(false))
//     return { fulfilled: true, message: 'successful' }
//   } catch (error) {
//     dispatch(addViewBranchesLoading(false));
//     return { fulfilled: false, message: error.response.data.detail }
//   }
// };

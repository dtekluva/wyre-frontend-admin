
import branchTypes from "../../reducers/branches/branches.types";

export const getViewBranchesLoading = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const getViewBranchesSuccess = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });

export const getViewBranchesTopLoading = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_TOP_LOADING,
    payload,
  });
  
export const getViewBranchesTopSuccess = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_TOP_SUCCESS,
    payload,
  });

export const addViewBranchesLoading = (payload = true) => ({
    type: branchTypes.ADD_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const addViewBranchesSuccess = (payload = true) => ({
    type: branchTypes.ADD_VIEWBRANCHES_SUCCESS,
    payload,
  });

  export const getBranchLoading = (payload = true) => ({
    type: branchTypes.GET_BRANCH_LOADING,
    payload,
  });
  
export const getBranchSuccess = (payload = true) => ({
    type: branchTypes.GET_BRANCH_SUCCESS,
    payload,
  });

    
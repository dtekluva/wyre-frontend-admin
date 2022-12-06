
import branchTypes from "../../reducers/branch/branch.types";

export const getBranchLoading = (payload = true) => ({
    type: branchTypes.GET_BRANCH_LOADING,
    payload,
  });
  
export const getBranchSuccess = (payload = true) => ({
    type: branchTypes.GET_BRANCH_SUCCESS,
    payload,
  });

export const addBranchLoading = (payload = true) => ({
    type: branchTypes.ADD_BRANCH_LOADING,
    payload,
  });
  
export const addBranchSuccess = (payload = true) => ({
    type: branchTypes.GET_BRANCH_SUCCESS,
    payload,
  });


    
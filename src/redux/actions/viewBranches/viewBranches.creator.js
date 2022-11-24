
import viewBranchesTypes from "../../reducers/viewBranches/viewBranches.types";

export const getViewBranchesLoading = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const getViewBranchesSuccess = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });
export const addViewBranchesLoading = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const addViewBranchesSuccess = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });


    
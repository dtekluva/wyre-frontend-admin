
import viewBranchesTypes from "../../reducers/branches/branches.types";

export const getViewBranchesLoading = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const getViewBranchesSuccess = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });

export const getViewBranchesTopLoading = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_TOP_LOADING,
    payload,
  });
  
export const getViewBranchesTopSuccess = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_TOP_SUCCESS,
    payload,
  });

export const addViewBranchesLoading = (payload = true) => ({
    type: viewBranchesTypes.ADD_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const addViewBranchesSuccess = (payload = true) => ({
    type: viewBranchesTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });


    
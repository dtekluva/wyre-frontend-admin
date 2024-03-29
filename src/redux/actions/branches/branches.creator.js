
import branchTypes from "../../reducers/branches/branches.types";

export const getViewBranchesLoading = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_LOADING,
    payload,
  });
  
export const getViewBranchesSuccess = (payload = true) => ({
    type: branchTypes.GET_VIEWBRANCHES_SUCCESS,
    payload,
  });

export const getResellerBranchesLoading = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCHES_LOADING,
    payload,
  });
  
export const getResellerBranchesSuccess = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCHES_SUCCESS,
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

export const getResellerBranchesTopLoading = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCHES_TOP_LOADING,
    payload,
  });
  
export const getResellerBranchesTopSuccess = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCHES_TOP_SUCCESS,
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
  
export const addUserBranchesLoading = (payload = true) => ({
    type: branchTypes.ADD_USER_BRANCHES_LOADING,
    payload,
  });
  
export const addUserBranchesSuccess = (payload = true) => ({
    type: branchTypes.ADD_USER_BRANCHES_SUCCESS,
    payload,
  });

export const getBranchEnergyStatsLoading = (payload = true) => ({
    type: branchTypes.GET_BRANCH_ENERGY_STATS_LOADING,
    payload,
  });
  
export const getBranchEnergyStatsSuccess = (payload = true) => ({
    type: branchTypes.GET_BRANCH_ENERGY_STATS_SUCCESS,
    payload,
  });

export const getResellerBranchEnergyStatsLoading = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCH_ENERGY_STATS_LOADING,
    payload,
  });
  
export const getResellerBranchEnergyStatsSuccess = (payload = true) => ({
    type: branchTypes.GET_RESELLERBRANCH_ENERGY_STATS_SUCCESS,
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

export const getResellerBranchLoading = (payload = true) => ({
    type: branchTypes.GET_RESELLER_BRANCH_LOADING,
    payload,
  });
  
export const getResellerBranchSuccess = (payload = true) => ({
    type: branchTypes.GET_RESELLER_BRANCH_SUCCESS,
    payload,
  });

export const editBranchLoading = (payload = true) => ({
    type: branchTypes.EDIT_BRANCH_LOADING,
    payload,
  });
  
export const editBranchSuccess = (payload = true) => ({
    type: branchTypes.EDIT_BRANCH_SUCCESS,
    payload,
  });
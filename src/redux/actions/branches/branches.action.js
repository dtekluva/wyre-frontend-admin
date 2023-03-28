import { APIService } from "../../../config/api/apiConfig";

import {
  addUserBranchesLoading,
  addUserBranchesSuccess,
  addViewBranchesLoading, addViewBranchesSuccess, editBranchLoading, editBranchSuccess, getBranchEnergyStatsLoading, getBranchEnergyStatsSuccess, getBranchLoading,
  getBranchSuccess, getResellerBranchEnergyStatsLoading, getResellerBranchEnergyStatsSuccess, getResellerBranchesLoading, getResellerBranchesSuccess, getResellerBranchesTopLoading, getResellerBranchesTopSuccess, getResellerBranchLoading, getResellerBranchSuccess, getViewBranchesLoading,
  getViewBranchesSuccess, getViewBranchesTopLoading, getViewBranchesTopSuccess
} from "./branches.creator";



export const getBranches = (clientId, startDate, endDate) => async (dispatch) => {


  dispatch(getViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getViewBranchesSuccess(response.data.authenticatedData));
    dispatch(getViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getResellerViewBranches = (clientId, startDate, endDate) => async (dispatch) => {


  dispatch(getResellerBranchesLoading(true));

  const requestUrl = `/cadmin/reseller_branches/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getResellerBranchesSuccess(response.data.authenticatedData));
    dispatch(getResellerBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getResellerBranchesLoading(false));
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

export const getResellerBranchesTop = (clientId, startDate, endDate) => async (dispatch) => {


  dispatch(getResellerBranchesTopLoading(true));

  const requestUrl = `/cadmin/reseller-branches-sum/${clientId}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getResellerBranchesTopSuccess(response.data.authenticatedData));
    dispatch(getResellerBranchesTopLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getResellerBranchesTopLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addABranch = (parameters = {}) => async (dispatch) => {

  dispatch(addViewBranchesLoading(true));

  const requestUrl = `/cadmin/branches/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addViewBranchesSuccess(response.data));

    dispatch(addViewBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addViewBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addUserToBranch = (parameters = {}) => async (dispatch) => {

  dispatch(addUserBranchesLoading(true));

  const requestUrl = `/cadmin/add_user/33`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addUserBranchesSuccess(response.data));

    dispatch(addUserBranchesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addUserBranchesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getABranchEnergyStats = (branch_id, startDate, endDate) => async (dispatch) => {
  dispatch(getBranchEnergyStatsLoading(true));
  const requestUrl = `/cadmin/branch_energy_stats/${branch_id}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getBranchEnergyStatsSuccess(response.data.authenticatedData));
    dispatch(getBranchEnergyStatsLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getBranchEnergyStatsLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
export const getAResellerBranchEnergyStats = (branch_id, startDate, endDate) => async (dispatch) => {
  dispatch(getResellerBranchEnergyStatsLoading(true));
  const requestUrl = `/cadmin/reseller_energy_stats/${branch_id}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getResellerBranchEnergyStatsSuccess(response.data.authenticatedData));
    dispatch(getResellerBranchEnergyStatsLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getResellerBranchEnergyStatsLoading(false));
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

export const getAResellerBranch = (branch_id, startDate, endDate) => async (dispatch) => {
  dispatch(getResellerBranchLoading(true));
  const requestUrl = `/cadmin/reseller_branch/${branch_id}/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getResellerBranchSuccess(response.data.authenticatedData));
    dispatch(getResellerBranchLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getResellerBranchLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const updateBranch = (branch_id, bodyParams) => async (dispatch) => {
  dispatch(editBranchLoading(true));
  const requestUrl = `/cadmin/branch/${branch_id}`;
  try {

    const response = await APIService.patch(requestUrl, bodyParams);

    dispatch(editBranchSuccess(response.data));
    dispatch(editBranchLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(editBranchLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

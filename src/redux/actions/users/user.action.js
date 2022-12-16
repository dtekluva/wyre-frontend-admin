import { APIService } from "../../../config/api/apiConfig";

import { editUserLoading, editUserSuccess, getUserLoading, 
  getUserOverviewLoading, getUserOverviewSuccess, 
  getUserSuccess } from "./user.creator";



export const getUsers = (parameters={}) => async (dispatch) => {

  dispatch(getUserLoading(true));

  const requestUrl = ``;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getUserSuccess(response.data));
    window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(getUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
export const getUsersOverview = (branch_id) => async (dispatch) => {

  dispatch(getUserOverviewLoading(true));

  const requestUrl = `cadmin/branch/users/${branch_id}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getUserOverviewSuccess(response.data.authenticatedData));
    dispatch(getUserOverviewLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getUserOverviewLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


export const updateUser = (userId, values) => async (dispatch) => {
  dispatch(editUserLoading(true));
  const requestUrl = `/api/v1/user/${userId}`;
  try {

    const response = await APIService.post(requestUrl, values);

    dispatch(editUserSuccess(response.data));
    dispatch(editUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(editUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

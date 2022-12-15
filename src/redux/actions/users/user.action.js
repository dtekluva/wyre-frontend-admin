import { APIService } from "../../../config/api/apiConfig";
// import { multipartFormBuilder } from "../../../helpers/GeneralHelper";

import { addUserLoading, addUserSuccess, editUserLoading, editUserSuccess, getUserLoading, getUserOverviewLoading, getUserOverviewSuccess, getUserSuccess } from "./user.creator";



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
export const getUsersOverview = (startDate, endDate) => async (dispatch) => {

  dispatch(getUserOverviewLoading(true));

  const requestUrl = `cadmin/branch/users/21`;
  try {
    const response = await APIService.get(requestUrl);

    console.log('this is the response data', response.data);
    dispatch(getUserOverviewSuccess(response.data.authenticatedData));
    dispatch(getUserOverviewLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getUserOverviewLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

/* export const addAUser = (parameters, file) => async (dispatch) => {
  dispatch(addUserLoading(true));
  const requestUrl = `/cadmin/clients`;
  try {
    const formData = multipartFormBuilder(parameters);
    formData.set('file', file);

    const response = await APIService.postMultipart(requestUrl, formData);

    dispatch(addUserSuccess(response.data));
    dispatch(addUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
*/

export const updateUser = (parameters) => async (dispatch) => {
  dispatch(editUserLoading(true));
  const requestUrl = `/api/v1/user/35`;
  try {
    // const formData = multipartFormBuilder(parameters);
    // formData.set();

    const response = await APIService.put(requestUrl, parameters);

    dispatch(editUserSuccess(response.data));
    dispatch(editUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(editUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

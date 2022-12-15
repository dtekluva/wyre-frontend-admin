
import { APIService, APIServiceNoAuth } from "../../../config/api/apiConfig";
import { addUsersLoading, addUsersSuccess, getRolesLoading, getRolesSuccess, loginUserLoading } from "./auth.creator";



export const loginAUser = (parameters) => async (dispatch) => {
  dispatch(loginUserLoading(true));
  const requestUrl = `/token/`;
  try {
    const response = await APIServiceNoAuth.post(requestUrl, parameters);

    // dispatch(loginUserSuccess(response.data));
    window.localStorage.setItem('loggedWyreUserAdmin', JSON.stringify(response.data));
    dispatch(loginUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(loginUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


/**
 * @description method to sign out a user
 * @returns {object} returns error or clears local storage
 */
 export const logUserOut = () => async (dispatch) => {
  try {
    
    localStorage.removeItem('loggedWyreUserAdmin');
    return window.location.href = '/';
  } catch (error) {
    return { signedOut: false, error: error.message };
  }
};


export const getAllRoles = () => async (dispatch) => {

  dispatch(getRolesLoading(true));
  const requestUrl = `/cadmin/roles`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getRolesSuccess(response.data.authenticatedData));
    dispatch(getRolesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getRolesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
export const addUsers = (parameters) => async (dispatch) => {
  console.log('this is me in the get reolaldkjslkdjolksjlokcxjkosjndmlokjnsdjko============.>>>>>>>>>.', parameters)
  dispatch(addUsersLoading(true));
  const requestUrl = `/cadmin/users/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addUsersSuccess(response.data.authenticatedData));
    dispatch(addUsersLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addUsersLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
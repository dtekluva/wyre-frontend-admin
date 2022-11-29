
import { APIServiceNoAuth } from "../../../config/api/apiConfig";
import { loginUserLoading } from "./auth.creator";



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

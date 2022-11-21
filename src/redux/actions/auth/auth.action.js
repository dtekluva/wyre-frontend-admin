
import { APIServiceNoAuth } from "../../../config/api/apiConfig";
import { loginUserLoading, loginUserSuccess } from "./auth.creator";



export const loginAUser = (parameters) => async (dispatch) => {
  dispatch(loginUserLoading(true));
  const requestUrl = `/token/`;
  try {
    const response = await APIServiceNoAuth.post(requestUrl, parameters);

    dispatch(loginUserSuccess(response.data));
    window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(loginUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(loginUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
import { APIServiceNoAuth } from "../../config/api/apiConfig";
import { loginUserLoading, loginUserSuccess } from "./auth.creator";




export const loginAUser = (parameters) => async (dispatch) => {
  dispatch(loginUserLoading(true));
  const requestUrl = `/token/`;
  try {
    const response = await APIServiceNoAuth.post(requestUrl, parameters);
    dispatch(loginUserSuccess(response.data.data));
    dispatch(loginUserLoading(false))
    return { fullfilled: true, message: response.data.detail }
  } catch (error) {
    dispatch(loginUserLoading(false));
    return { fullfilled: false, message: error.response.detail }
  }
};
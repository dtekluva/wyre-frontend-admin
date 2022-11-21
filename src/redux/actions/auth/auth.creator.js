import authTypes from "../../reducers/auth/auth.types";


export const loginUserLoading = (payload = true) => ({
    type: authTypes.LOGIN_USER_LOADING,
    payload,
  });
  
export const loginUserSuccess = (payload = true) => ({
    type: authTypes.LOGIN_USER_SUCCESS,
    payload,
  });


  export const logoutUser = (payload = true) => ({
      type: authTypes.LOGOUT_USER,
      payload,
    });
    
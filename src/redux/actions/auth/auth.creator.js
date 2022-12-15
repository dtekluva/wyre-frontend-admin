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


export const getRolesLoading = (payload = true) => ({
  type: authTypes.GET_ROLES_LOADING,
  payload,
});

export const getRolesSuccess = (payload = true) => ({
  type: authTypes.GET_ROLES_SUCCESS,
  payload,
});
export const addUsersLoading = (payload = true) => ({
  type: authTypes.ADD_USERS_LOADING,
  payload,
});

export const addUsersSuccess = (payload = true) => ({
  type: authTypes.ADD_USER_SUCCESS,
  payload,
});


import userTypes from "../../reducers/users/user.types";

export const getUserLoading = (payload = true) => ({
    type: userTypes.GET_USER_LOADING,
    payload,
  });
  
export const getUserSuccess = (payload = true) => ({
    type: userTypes.GET_USER_SUCCESS,
    payload,
  });
export const getUserOverviewLoading = (payload = true) => ({
    type: userTypes.GET_USER_OVERVIEW_LOADING,
    payload,
  });
  
export const getUserOverviewSuccess = (payload = true) => ({
    type: userTypes.GET_USER_OVERVIEW_SUCCESS,
    payload,
  });
export const addUserLoading = (payload = true) => ({
    type: userTypes.ADD_USER_LOADING,
    payload,
  });
  
export const addUserSuccess = (payload = true) => ({
    type: userTypes.ADD_USER_SUCCESS,
    payload,
  });
  
export const editUserLoading = (payload = true) => ({
    type: userTypes.EDIT_USER_LOADING,
    payload,
  });
  
export const editUserSuccess = (payload = true) => ({
    type: userTypes.EDIT_USER_SUCCESS,
    payload,
  });
  
export const deactivateUserLoading = (payload = true) => ({
    type: userTypes.DEACTIVATE_USER_LOADING,
    payload,
  });
  
export const deactivateUserSuccess = (payload = true) => ({
    type: userTypes.DEACTIVATE_USER_SUCCESS,
    payload,
  });


    
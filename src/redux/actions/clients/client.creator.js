
import clientTypes from "../../reducers/clients/cleint.types";

export const getClientLoading = (payload = true) => ({
    type: clientTypes.LOGIN_USER_LOADING,
    payload,
  });
  
export const getClientSuccess = (payload = true) => ({
    type: clientTypes.LOGIN_USER_SUCCESS,
    payload,
  });


    
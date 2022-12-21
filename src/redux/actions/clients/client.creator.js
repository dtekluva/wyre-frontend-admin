
import clientTypes from "../../reducers/clients/cleint.types";

export const getClientLoading = (payload = true) => ({
    type: clientTypes.GET_CLIENT_LOADING,
    payload,
  });
  
export const getClientSuccess = (payload = true) => ({
    type: clientTypes.GET_CLIENT_SUCCESS,
    payload,
  });
export const getClientOverviewLoading = (payload = true) => ({
    type: clientTypes.GET_CLIENT_OVERVIEW_LOADING,
    payload,
  });
  
export const getClientOverviewSuccess = (payload = true) => ({
    type: clientTypes.GET_CLIENT_OVERVIEW_SUCCESS,
    payload,
  });
export const addClientLoading = (payload = true) => ({
    type: clientTypes.ADD_CLIENT_LOADING,
    payload,
  });
  
export const addClientSuccess = (payload = true) => ({
    type: clientTypes.ADD_CLIENT_SUCCESS,
    payload,
  });


    
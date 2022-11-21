import { APIService } from "../../../config/api/apiConfig";

import { getClientLoading, getClientSuccess } from "./client.creator";



export const getClients = (parameters={}) => async (dispatch) => {

  dispatch(getClientLoading(true));

  const requestUrl = `/cadmin/clients`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getClientSuccess(response.data));
    window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(getClientLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getClientLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

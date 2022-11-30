import { APIService } from "../../../config/api/apiConfig";

import { addClientLoading, addClientSuccess, getClientLoading, getClientOverviewLoading, getClientOverviewSuccess, getClientSuccess } from "./client.creator";



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
export const getClientsOverview = (startDate, endDate) => async (dispatch) => {

  dispatch(getClientOverviewLoading(true));

  const requestUrl = `cadmin/clients/${startDate}/${endDate}`;
  try {
    const response = await APIService.get(requestUrl);

    console.log('this is the response data', response.data);
    dispatch(getClientOverviewSuccess(response.data.authenticatedData));
    dispatch(getClientOverviewLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getClientOverviewLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addAClient = (parameters, file) => async (dispatch) => {

  console.log('===================================>>>>>>>>>', parameters)
  dispatch(addClientLoading(true));

  const requestUrl = `/cadmin/clients`;
  try {
    const formData = new FormData(parameters);
    formData.set('file', file);
    const response = await APIService.postMultipart(requestUrl, formData);

    // dispatch(addClientSuccess(response.data));
    dispatch(addClientLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addClientLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

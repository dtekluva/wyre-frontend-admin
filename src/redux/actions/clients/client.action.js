import { APIService } from "../../../config/api/apiConfig";
import { multipartFormBuilder } from "../../../helpers/GeneralHelper";

import { addClientLoading, addClientSuccess, getClientLoading, getClientOverviewLoading, getClientOverviewSuccess, getClientSuccess } from "./client.creator";



export const getClients = (parameters={}) => async (dispatch) => {

  dispatch(getClientLoading(true));

  const requestUrl = `/cadmin/clients`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getClientSuccess(response.data));

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

    dispatch(getClientOverviewSuccess(response.data.authenticatedData));
    dispatch(getClientOverviewLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getClientOverviewLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addAClient = (parameters, file) => async (dispatch) => {
  dispatch(addClientLoading(true));
  const requestUrl = `/cadmin/clients`;
  try {
    const formData = multipartFormBuilder(parameters);
    formData.set('file', file);

    const response = await APIService.postMultipart(requestUrl, formData);

    dispatch(addClientSuccess(response.data));
    dispatch(addClientLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addClientLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

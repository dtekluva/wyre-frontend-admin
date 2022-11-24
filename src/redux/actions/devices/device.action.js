import { APIService } from "../../../config/api/apiConfig";

import { addDeviceLoading, addDeviceSuccess, getDeviceLoading, getDeviceSuccess } from "./device.creator";



export const getDevices = (parameters={}) => async (dispatch) => {

  dispatch(getDeviceLoading(true));

  const requestUrl = `/cadmin/devices`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getDeviceSuccess(response.data));
    window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(getDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addADevive = (parameters={}) => async (dispatch) => {

  console.log('===================================>>>>>>>>>', parameters)
  dispatch(addDeviceLoading(true));

  const requestUrl = `/cadmin/devices/`;
  try {
    // const response = await APIService.post(requestUrl, parameters);

    // dispatch(addDeviceSuccess(response.data));
    dispatch(addDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

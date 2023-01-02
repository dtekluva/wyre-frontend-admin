import { APIService } from "../../../config/api/apiConfig";

import {
  addDeviceLoading, addDeviceSuccess, deactivateDeviceLoading, deactivateDeviceSuccess, editDeviceLoading, editDeviceSuccess, getDeviceLoading,
  getDeviceOverviewLoading, getDeviceOverviewSuccess, getDeviceSuccess,
  getDeviceTypeLoading, getDeviceTypeSuccess
} from "./device.creator";



export const getDevices = (parameters = {}) => async (dispatch) => {

  dispatch(getDeviceLoading(true));

  const requestUrl = `/cadmin/devices`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getDeviceSuccess(response.data));
    // window.localStorage.setItem('loggedWyreUser', JSON.stringify(response.data));
    dispatch(getDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getDevicesOverview = (branch_id) => async (dispatch) => {

  dispatch(getDeviceOverviewLoading(true));

  const requestUrl = `cadmin/branch/devices/${branch_id}`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getDeviceOverviewSuccess(response.data.authenticatedData));
    dispatch(getDeviceOverviewLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getDeviceOverviewLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addADevice = (parameters = {}) => async (dispatch) => {

  dispatch(addDeviceLoading(true));

  const requestUrl = `/cadmin/devices/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addDeviceSuccess(response.data));
    dispatch(addDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


export const getDeviceTypes = (parameters = {}) => async (dispatch) => {

  dispatch(getDeviceTypeLoading(true));

  const requestUrl = `/cadmin/device-types`;
  try {
    const response = await APIService.get(requestUrl, parameters);

    dispatch(getDeviceTypeSuccess(response.data.authenticatedData));
    dispatch(getDeviceTypeLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getDeviceTypeLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const updateDevice = (id, values) => async (dispatch) => {
  dispatch(editDeviceLoading(true));
  const requestUrl = `/cadmin/device/${id}`;
  try {

    const response = await APIService.patch(requestUrl, values);

    dispatch(editDeviceSuccess(response.data));
    dispatch(editDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(editDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const disableDevice = (id, values) => async (dispatch) => {
  dispatch(deactivateDeviceLoading(true));
  const requestUrl = `cadmin/device_state/${id}/`;
  try {

    const response = await APIService.post(requestUrl, values);

    dispatch(deactivateDeviceSuccess(response.data));
    dispatch(deactivateDeviceLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(deactivateDeviceLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


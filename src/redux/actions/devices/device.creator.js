import deviceTypes from "../../reducers/devices/device.types";

export const getDeviceLoading = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_LOADING,
    payload,
  });
  
export const getDeviceSuccess = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_SUCCESS,
    payload,
  });
export const addDeviceLoading = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_LOADING,
    payload,
  });
  
export const addDeviceSuccess = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_SUCCESS,
    payload,
  });


    
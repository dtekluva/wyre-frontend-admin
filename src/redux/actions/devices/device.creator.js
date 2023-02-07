import deviceTypes from "../../reducers/devices/device.types";

export const getDeviceLoading = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_LOADING,
    payload,
  });
  
export const getDeviceSuccess = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_SUCCESS,
    payload,
  });
  export const getDeviceOverviewLoading = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_OVERVIEW_LOADING,
    payload,
  });
  
export const getDeviceOverviewSuccess = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_OVERVIEW_SUCCESS,
    payload,
  });
export const addDeviceLoading = (payload = true) => ({
    type: deviceTypes.ADD_DEVICE_LOADING,
    payload,
  });
  
export const addDeviceSuccess = (payload = true) => ({
    type: deviceTypes.ADD_DEVICE_SUCCESS,
    payload,
  });

  export const getDeviceTypeSuccess = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_TYPE_SUCCESS,
    payload,
  });
  export const getDeviceTypeLoading = (payload = true) => ({
    type: deviceTypes.GET_DEVICE_TYPE_LOADING,
    payload,
  });

  export const editDeviceLoading = (payload = true) => ({
    type: deviceTypes.EDIT_DEVICE_LOADING,
    payload,
  }); 
  export const editDeviceSuccess = (payload = true) => ({
    type: deviceTypes.EDIT_DEVICE_SUCCESS,
    payload,
  });
  export const deactivateDeviceLoading = (payload = true) => ({
    type: deviceTypes.DEACTIVATE_DEVICE_LOADING,
    payload,
  }); 
  export const deactivateDeviceSuccess = (payload = true) => ({
    type: deviceTypes.DEACTIVATE_DEVICE_SUCCESS,
    payload,
  });
    
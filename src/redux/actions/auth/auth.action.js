
import { APIService, APIServiceNoAuth } from "../../../config/api/apiConfig";
import { addUserBranchLoading, addUserBranchSuccess, addUsersLoading, addUsersSuccess, editUserLoading, editUserSuccess, getAllDevicesLoading, getAllDevicesSuccess, getDeviceReadingsLoading, getDeviceReadingsSuccess, getRolesLoading, getRolesSuccess, loginUserLoading } from "./auth.creator";



export const loginAUser = (parameters) => async (dispatch) => {
  dispatch(loginUserLoading(true));
  const requestUrl = `/token/`;
  try {
    const response = await APIServiceNoAuth.post(requestUrl, parameters);

    // dispatch(loginUserSuccess(response.data));
    window.localStorage.setItem('loggedWyreUserAdmin', JSON.stringify(response.data));
    dispatch(loginUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(loginUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};


/**
 * @description method to sign out a user
 * @returns {object} returns error or clears local storage
 */
 export const logUserOut = () => async (dispatch) => {
  try {
    
    localStorage.removeItem('loggedWyreUserAdmin');
    return window.location.href = '/';
  } catch (error) {
    return { signedOut: false, error: error.message };
  }
};

export const getAllRoles = () => async (dispatch) => {

  dispatch(getRolesLoading(true));
  const requestUrl = `/cadmin/roles`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getRolesSuccess(response.data.authenticatedData));
    dispatch(getRolesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getRolesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getDownloadAllDevices = (password) => async (dispatch) => {

  dispatch(getAllDevicesLoading(true));
  // const requestUrl = `/get_all_devices/${password}/`;
  const requestUrl = `/api/v1/get_all_devices/%3Cpassword%3E/`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getAllDevicesSuccess(response.data));
    dispatch(getAllDevicesLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getAllDevicesLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const getDownloadDeviceReadings = (password, device, startDate, endDate) => async (dispatch) => {

  dispatch(getDeviceReadingsLoading(true));
  const requestUrl = `/get_device_readings/${password}/${device}/${startDate}/${endDate}/`;
  // const requestUrl = `/get_device_readings/<password>/<device>/<start_date>/<end_date>/`;
  try {
    const response = await APIService.get(requestUrl);

    dispatch(getDeviceReadingsSuccess(response.data.authenticatedData));
    dispatch(getDeviceReadingsLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(getDeviceReadingsLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addUsers = (parameters) => async (dispatch) => {
  dispatch(addUsersLoading(true));
  const requestUrl = `/cadmin/users/`;
  try {
    const response = await APIService.post(requestUrl, parameters);

    dispatch(addUsersSuccess(response.data.authenticatedData));
    dispatch(addUsersLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addUsersLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const addUserToBranch = (userId, values) => async (dispatch) => {
  dispatch(addUserBranchLoading(true));
  const requestUrl = `/cadmin/add_user/${userId}`;
  try {
    const response = await APIService.post(requestUrl, values);

    dispatch(addUserBranchSuccess(response.data.authenticatedData));
    dispatch(addUserBranchLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(addUserBranchLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};

export const updateUser = (parameters) => async (dispatch) => {
  dispatch(editUserLoading(true));
  const requestUrl = `/api/v1/user/35`;
  try {
    // const formData = multipartFormBuilder(parameters);
    // formData.set();

    const response = await APIService.put(requestUrl, parameters);

    dispatch(editUserSuccess(response.data));
    dispatch(editUserLoading(false))
    return { fulfilled: true, message: 'successful' }
  } catch (error) {
    dispatch(editUserLoading(false));
    return { fulfilled: false, message: error.response.data.detail }
  }
};
import { APIService } from "../../../config/api/apiConfig";
import { addTariffLoading, addTariffSuccess, deleteTariffLoading, deleteTariffSuccess, editTariffLoading, editTariffSuccess, viewATariffLoading, viewATariffSuccess, viewTariffLoading, viewTariffsLoading, viewTariffsSuccess, viewTariffSuccess } from "./tariffs.creator";


export const addATariff = (parameters = {}) => async (dispatch) => {

    dispatch(addTariffLoading(true));
  
    const requestUrl = `/cadmin/tariffs/create/`;
    try {
      const response = await APIService.post(requestUrl, parameters);
  
      dispatch(addTariffSuccess(response.data));
  
      dispatch(addTariffLoading(false))
      return { fulfilled: true, message: 'successful' }
    } catch (error) {
      dispatch(addTariffLoading(false));
      return { fulfilled: false, message: error.response.data.detail }
    }
};

export const getATariff = (parameters = {}) => async (dispatch) => {

    dispatch(viewATariffLoading(true));
  
    const requestUrl = `/cadmin/branches/`;
    try {
      const response = await APIService.get(requestUrl, parameters);
  
      dispatch(viewATariffSuccess(response.data));
  
      dispatch(viewATariffLoading(false))
      return { fulfilled: true, message: 'successful' }
    } catch (error) {
      dispatch(viewATariffLoading(false));
      return { fulfilled: false, message: error.response.data.detail }
    }
};

export const getTariffs = (parameters = {}) => async (dispatch) => {

    dispatch(viewTariffsLoading(true));
  
    const requestUrl = `/cadmin/branches/`;
    try {
      const response = await APIService.get(requestUrl, parameters);
  
      dispatch(viewTariffsSuccess(response.data));
  
      dispatch(viewTariffsLoading(false))
      return { fulfilled: true, message: 'successful' }
    } catch (error) {
      dispatch(viewTariffsLoading(false));
      return { fulfilled: false, message: error.response.data.detail }
    }
};

export const updateATariff = (tariffId, parameters) => async (dispatch) => {

    dispatch(editTariffLoading(true));
  
    const requestUrl = `/cadmin/tariffs/${tariffId}/update/`;
    try {
      const response = await APIService.patch(requestUrl, parameters);
  
      dispatch(editTariffSuccess(response.data));
  
      dispatch(editTariffLoading(false))
      return { fulfilled: true, message: 'successful' }
    } catch (error) {
      dispatch(editTariffLoading(false));
      return { fulfilled: false, message: error.response.data.detail }
    }
};

export const deleteTariff = (tariffId, parameters) => async (dispatch) => {

    dispatch(deleteTariffLoading(true));
  
    const requestUrl = `/cadmin/tariffs/${tariffId}/delete/`;
    try {
      const response = await APIService.delete(requestUrl, parameters);
  
      dispatch(deleteTariffSuccess(response.data));
  
      dispatch(deleteTariffLoading(false))
      return { fulfilled: true, message: 'successful' }
    } catch (error) {
      dispatch(deleteTariffLoading(false));
      return { fulfilled: false, message: error.response.data.detail }
    }
};
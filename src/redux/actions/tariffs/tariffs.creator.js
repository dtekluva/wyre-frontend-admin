import tariffsTypes from "../../reducers/tariffs/tariffs.types";

export const addTariffLoading = (payload = true) => ({
    type: tariffsTypes.ADD_TARIFF_LOADING,
    payload,
});  
export const addTariffSuccess = (payload = true) => ({
    type: tariffsTypes.ADD_TARIFF_SUCCESS,
    payload,
});

export const viewATariffLoading = (payload = true) => ({
    type: tariffsTypes.VIEW_A_TARIFF_LOADING,
    payload,
});  
export const viewATariffSuccess = (payload = true) => ({
    type: tariffsTypes.VIEW_A_TARIFF_SUCCESS,
    payload,
});

export const viewTariffsLoading = (payload = true) => ({
    type: tariffsTypes.VIEW_TARIFFS_LOADING,
    payload,
});  
export const viewTariffsSuccess = (payload = true) => ({
    type: tariffsTypes.VIEW_TARIFFS_SUCCESS,
    payload,
});

export const editTariffLoading = (payload = true) => ({
    type: tariffsTypes.EDIT_TARIFF_LOADING,
    payload,
});  
export const editTariffSuccess = (payload = true) => ({
    type: tariffsTypes.EDIT_TARIFF_SUCCESS,
    payload,
});

export const deleteTariffLoading = (payload = true) => ({
    type: tariffsTypes.DELETE_TARIFF_LOADING,
    payload,
});  
export const deleteTariffSuccess = (payload = true) => ({
    type: tariffsTypes.DELETE_TARIFF_SUCCESS,
    payload,
});
import tariffsTypes from "./tariffs.types";

const INITIAL_STATE = {
    newTariffLoading: false,
    newTariff: false,
    fetchATariffLoading: false,
    fetchedTariff: false,
    fetchTariffsLoading: false,
    fetchedTariffs: false,
    updateTariffLoading: false,
    updatedTariff: false,
    deleteTariffLoading: false,
    deletedTariff: false,
};

const tariffsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case tariffsTypes.ADD_TARIFF_LOADING:

            return {

                ...state,
                newTariffLoading: action.payload,

            };
        case tariffsTypes.ADD_TARIFF_SUCCESS:

            return {

                ...state,
                newTariff: action.payload,

            };

        case tariffsTypes.VIEW_A_TARIFF_LOADING:

            return {

                ...state,
                fetchATariffLoading: action.payload,

            };
        case tariffsTypes.VIEW_A_TARIFF_SUCCESS:

            return {

                ...state,
                fetchedTariff: action.payload,

            };
            
        case tariffsTypes.VIEW_TARIFFS_LOADING:

            return {

                ...state,
                fetchTariffsLoading: action.payload,

            };
        case tariffsTypes.VIEW_TARIFFS_SUCCESS:

            return {

                ...state,
                fetchedTariffs: action.payload,

            };

        case tariffsTypes.EDIT_TARIFF_LOADING:

            return {

                ...state,
                updateTariffLoading: action.payload,

            };
        case tariffsTypes.EDIT_TARIFF_SUCCESS:

            return {

                ...state,
                updatedTariff: action.payload,

            };

        case tariffsTypes.DELETE_TARIFF_LOADING:

            return {

                ...state,
                deleteTariffLoading: action.payload,

            };
        case tariffsTypes.DELETE_TARIFF_SUCCESS:

            return {

                ...state,
                deletedTariff: action.payload,

            };

        default: return state;

    }

};

export default tariffsReducer;
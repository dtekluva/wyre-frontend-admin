import clientTypes from "./cleint.types";

const INITIAL_STATE = {
    fetchClientLoading: false,
    fetchedClient: false,
    fetchClientOverviewLoading: false,
    fetchedClientOverview: false,
    newClientLoading: false,
    newClient: false,
    updateClientLoading: false,
    updatedClient: false,
};

const clientReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case clientTypes.GET_CLIENT_LOADING:

            return {

                ...state,
                fetchClientLoading: action.payload,

            };
        case clientTypes.GET_CLIENT_SUCCESS:

            return {

                ...state,
                fetchedClient: action.payload,

            };
        case clientTypes.GET_CLIENT_OVERVIEW_LOADING:

            return {

                ...state,
                fetchClientOverviewLoading: action.payload,

            };
        case clientTypes.GET_CLIENT_OVERVIEW_SUCCESS:

            return {
                ...state,
                fetchedClientOverview: action.payload,

            };
        case clientTypes.ADD_CLIENT_SUCCESS:

            return {

                ...state,
                newClient: action.payload,

            };
        case clientTypes.ADD_CLIENT_LOADING:

            return {

                ...state,
                newClientLoading: action.payload,

            };

        case clientTypes.EDIT_CLIENT_SUCCESS:

            return {

                ...state,
                updatedClient: action.payload,

            };

        case clientTypes.EDIT_CLIENT_LOADING:

            return {

                ...state,
                updateClientLoading: action.payload,

            };

        default: return state;

    }

};

export default clientReducer;
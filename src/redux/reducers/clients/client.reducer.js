import clientTypes from "./cleint.types";

const INITIAL_STATE = {
    fetchClientLoading: false,
    fetchedClient: false,
    newClientLoading: false,
    newClient: false,
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

        default: return state;

    }

};

export default clientReducer;
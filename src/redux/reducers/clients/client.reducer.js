import clientTypes from "./cleint.types";

const INITIAL_STATE = {
    fetchClientLoading: false,
    fetchedClient: false,
};

const clientReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case clientTypes.GET_CLIENT_LOADING:

            return {

                ...state,
                fetchClientLoading: action.payload,

            };
        case clientTypes.LOGIN_USER_SUCCESS:

            return {

                ...state,
                fetchedClient: action.payload,

            };

        default: return state;

    }

};

export default clientReducer;
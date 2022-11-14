import authTypes from "./auth.types";

const INITIAL_STATE = {
    loginUserLoading: false,
    userData: false,
};

const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case authTypes.LOGIN_USER_LOADING:

            return {

                ...state,
                loginUserLoading: action.payload,

            };
        case authTypes.LOGIN_USER_SUCCESS:

            return {

                ...state,
                userData: action.payload,

            };

        default: return state;

    }

};

export default authReducer;
import authTypes from "./auth.types";

const INITIAL_STATE = {
    loginUserLoading: false,
    userData: false,
    fetchedRoles: false,
    fetchedRolesLoading: false,
    newUserLoading: false,
    newUsers: false,
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
        case authTypes.GET_ROLES_LOADING:

            return {

                ...state,
                fetchedRolesLoading: action.payload,

            };
        case authTypes.GET_ROLES_SUCCESS:

            return {
                ...state,
                fetchedRoles: action.payload,
            };
        case authTypes.ADD_USERS_LOADING:

            return {

                ...state,
                newUserLoading: action.payload,

            };
        case authTypes.ADD_USER_SUCCESS:

            return {
                ...state,
                newUsers: action.payload,
            };

        default: return state;

    }

};

export default authReducer;
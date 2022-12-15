import userTypes from "./user.types";

const INITIAL_STATE = {
    fetchUserLoading: false,
    fetchedUser: false,
    fetchUserOverviewLoading: false,
    fetchedUserOverview: false,
    newUserLoading: false,
    newUser: false,
    updateUserLoading: false,
    updatedUser: false,
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case userTypes.GET_USER_LOADING:

            return {

                ...state,
                fetchUserLoading: action.payload,

            };
        case userTypes.GET_USER_SUCCESS:

            return {

                ...state,
                fetchedUser: action.payload,

            };
        case userTypes.GET_USER_OVERVIEW_LOADING:

            return {

                ...state,
                fetchUserOverviewLoading: action.payload,

            };
        case userTypes.GET_USER_OVERVIEW_SUCCESS:

            return {
                ...state,
                fetchedUserOverview: action.payload,

            };
        case userTypes.ADD_USER_SUCCESS:

            return {

                ...state,
                newUser: action.payload,

            };
        case userTypes.ADD_USER_LOADING:

            return {

                ...state,
                newUserLoading: action.payload,

            };

        case userTypes.EDIT_USER_SUCCESS:

            return {

                ...state,
                updatedUser: action.payload,

            };

        case userTypes.EDIT_USER_LOADING:

            return {

                ...state,
                updateUserLoading: action.payload,

            };

        default: return state;

    }

};

export default userReducer;
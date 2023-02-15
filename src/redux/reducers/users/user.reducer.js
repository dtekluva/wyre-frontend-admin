import userTypes from "./user.types";

const INITIAL_STATE = {
    fetchUserLoading: false,
    fetchedUser: false,
    fetchUserOverviewLoading: false,
    fetchedUserOverview: false,
    fetchClientUserLoading: false,
    fetchedClientUser: false,
    newUserLoading: false,
    newUser: false,
    newUserBranchLoading: false,
    newUserBranch: false,
    updateUserLoading: false,
    updatedUser: false,
    deactivateUserLoading: false,
    deactivatedUser: false,
    removeUserLoading: false,
    removedUser: false,
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

        case userTypes.GET_CLIENT_USERS_LOADING:

            return {

                ...state,
                fetchClientUserLoading: action.payload,

            };
        case userTypes.GET_CLIENT_USERS_SUCCESS:

            return {

                ...state,
                fetchedClientUser: action.payload,

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

        case userTypes.ADD_USER_BRANCH_SUCCESS:

            return {

                ...state,
                newUserBranch: action.payload,

            };
        case userTypes.ADD_USER_BRANCH_LOADING:

            return {

                ...state,
                newUserBranchLoading: action.payload,

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

        case userTypes.DEACTIVATE_USER_SUCCESS:

            return {

                ...state,
                deactivatedUser: action.payload,

            };

        case userTypes.DEACTIVATE_USER_LOADING:

            return {

                ...state,
                deactivateUserLoading: action.payload,

            };
        case userTypes.REMOVE_USER_SUCCESS:

            return {

                ...state,
                removedUser: action.payload,

            };

        case userTypes.REMOVE_USER_LOADING:

            return {

                ...state,
                removeUserLoading: action.payload,

            };

        default: return state;

    }

};

export default userReducer;
import viewBranchesTypes from "./viewBranches.types";

const INITIAL_STATE = {
    fetchViewBranchesLoading: false,
    fetchedViewBranches: false,
    newViewBranchesLoading: false,
    newViewBranches: false,
};

const viewBranchesReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case viewBranchesTypes.GET_VIEWBRANCHES_LOADING:

            return {

                ...state,
                fetchViewBranchesLoading: action.payload,

            };
        case viewBranchesTypes.GET_VIEWBRANCHES_SUCCESS:

            return {

                ...state,
                fetchedViewBranches: action.payload,

            };
        case viewBranchesTypes.ADD_VIEWBRANCHES_SUCCESS:

            return {

                ...state,
                newViewBranches: action.payload,

            };
        case viewBranchesTypes.ADD_VIEWBRANCHES_LOADING:

            return {

                ...state,
                newViewBranchesLoading: action.payload,

            };

        default: return state;

    }

};

export default viewBranchesReducer;
import viewBranchesTypes from "./branches.types";

const INITIAL_STATE = {
    fetchViewBranchesLoading: false,
    fetchedViewBranches: false,
    fetchViewBranchesTopLoading: false,
    fetchedViewBranchesTop: false,
    newViewBranchesLoading: false,
    newViewBranches: false,
    fetchBranchLoading: false,
    fetchedBranch: false,
};

const branchesReducer = (state = INITIAL_STATE, action) => {

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
        case viewBranchesTypes.GET_VIEWBRANCHES_TOP_LOADING:

            return {

                ...state,
                fetchViewBranchesTopLoading: action.payload,

            };
        case viewBranchesTypes.GET_VIEWBRANCHES_TOP_SUCCESS:

            return {

                ...state,
                fetchedViewBranchesTop: action.payload,

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
        case viewBranchesTypes.GET_BRANCH_SUCCESS:

            return {

                ...state,
                fetchedBranch: action.payload,

            };
        case viewBranchesTypes.GET_BRANCH_LOADING:

            return {

                ...state,
                fetchBranchLoading: action.payload,

            };

        default: return state;

    }

};

export default branchesReducer;
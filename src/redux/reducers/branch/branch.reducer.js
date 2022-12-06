import branchTypes from "./branch.types";

const INITIAL_STATE = {
    fetchBranchLoading: false,
    fetchedBranch: false,
    newBranchLoading: false,
    newBranch: false,
};

const branchReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case branchTypes.GET_BRANCH_LOADING:

            return {

                ...state,
                fetchBranchLoading: action.payload,

            };

        case branchTypes.GET_BRANCH_SUCCESS:

            return {

                ...state,
                fetchedBranch: action.payload,

            };
    
        case branchTypes.ADD_BRANCH_SUCCESS:

            return {

                ...state,
                newBranch: action.payload,

            };
            
        case branchTypes.ADD_BRANCH_LOADING:

            return {

                ...state,
                newBranchLoading: action.payload,

            };

        default: return state;

    }

};

export default branchReducer;
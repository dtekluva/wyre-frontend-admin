import viewBranchesTypes from "./branches.types";

const INITIAL_STATE = {
    fetchViewBranchesLoading: false,
    fetchedViewBranches: false,
    fetchResellerBranchesLoading: false,
    fetchedResellerBranches: false,
    fetchViewBranchesTopLoading: false,
    fetchedViewBranchesTop: false,
    fetchResellerBranchesTopLoading: false,
    fetchedResellerBranchesTop: false,
    newViewBranchesLoading: false,
    newViewBranches: false,
    newUserBranchesLoading: false,
    newUserBranches: false,
    fetchBranchEnergyStatsLoading: false,
    fetchedBranchEnergyStats: false,
    fetchResellerBranchEnergyStatsLoading: false,
    fetchedResellerBranchEnergyStats: false,
    fetchBranchLoading: false,
    fetchedBranch: false,
    fetchResellerBranchLoading: false,
    fetchedResellerBranch: false,
    updateBranchLoading: false,
    updatedBranch: false,
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

        case viewBranchesTypes.GET_RESELLERBRANCHES_LOADING:

            return {

                ...state,
                fetchResellerBranchesLoading: action.payload,

            };
        case viewBranchesTypes.GET_RESELLERBRANCHES_SUCCESS:

            return {

                ...state,
                fetchedResellerBranches: action.payload,

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

        case viewBranchesTypes.GET_RESELLERBRANCHES_TOP_LOADING:

            return {

                ...state,
                fetchResellerBranchesTopLoading: action.payload,

            };
        case viewBranchesTypes.GET_RESELLERBRANCHES_TOP_SUCCESS:

            return {

                ...state,
                fetchedResellerBranchesTop: action.payload,

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

        case viewBranchesTypes.ADD_USER_BRANCHES_SUCCESS:

            return {

                ...state,
                newUserBranches: action.payload,

            };
        case viewBranchesTypes.ADD_USER_BRANCHES_LOADING:

            return {

                ...state,
                newUserBranchesLoading: action.payload,

            };

        case viewBranchesTypes.GET_BRANCH_ENERGY_STATS_SUCCESS:

            return {

                ...state,
                fetchedBranchEnergyStats: action.payload,

            };
        case viewBranchesTypes.GET_BRANCH_ENERGY_STATS_LOADING:

            return {

                ...state,
                fetchBranchEnergyStatsLoading: action.payload,

            };

        case viewBranchesTypes.GET_RESELLERBRANCH_ENERGY_STATS_SUCCESS:

            return {

                ...state,
                fetchedResellerBranchEnergyStats: action.payload,

            };
        case viewBranchesTypes.GET_RESELLERBRANCH_ENERGY_STATS_LOADING:

            return {

                ...state,
                fetchResellerBranchEnergyStatsLoading: action.payload,

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

        case viewBranchesTypes.GET_RESELLER_BRANCH_LOADING:

            return {

                ...state,
                fetchResellerBranchLoading: action.payload,

            };
        case viewBranchesTypes.GET_RESELLER_BRANCH_SUCCESS:

            return {

                ...state,
                fetchedResellerBranch: action.payload,

            };

        case viewBranchesTypes.EDIT_BRANCH_SUCCESS:

            return {

                ...state,
                updatedBranch: action.payload,

            };
        case viewBranchesTypes.EDIT_BRANCH_LOADING:

            return {

                ...state,
                updateBranchLoading: action.payload,

            };

        default: return state;

    }

};

export default branchesReducer;
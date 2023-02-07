import deviceTypes from "./device.types";

const INITIAL_STATE = {
    fetchDeviceLoading: false,
    fetchedDevice: false,
    fetchDeviceOverviewLoading: false,
    fetchedDeviceOverview: false,
    newDeviceLoading: false,
    newDevice: false,
    fetchDeviceTypeLoading: false,
    fetchedDeviceType: false,
    updateDeviceLoading: false,
    updatedDevice: false,
    deactivateDeviceLoading: false,
    deactivatedDevice: false,
};

const deviceReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case deviceTypes.GET_DEVICE_LOADING:

            return {

                ...state,
                fetchDeviceLoading: action.payload,

            };
        case deviceTypes.GET_DEVICE_SUCCESS:

            return {

                ...state,
                fetchedDevice: action.payload,

            };
        case deviceTypes.GET_DEVICE_TYPE_LOADING:

            return {
                ...state,
                fetchDeviceTypeLoading: action.payload,

            };
        case deviceTypes.GET_DEVICE_TYPE_SUCCESS:

            return {
                ...state,
                fetchedDeviceType: action.payload,
            };
        case deviceTypes.GET_DEVICE_OVERVIEW_LOADING:

            return {

                ...state,
                fetchDeviceOverviewLoading: action.payload,

            };
        case deviceTypes.GET_DEVICE_OVERVIEW_SUCCESS:

            return {
                ...state,
                fetchedDeviceOverview: action.payload,

            };

        case deviceTypes.ADD_DEVICE_SUCCESS:

            return {

                ...state,
                newDevice: action.payload,

            };
        case deviceTypes.ADD_DEVICE_LOADING:

            return {

                ...state,
                newDeviceLoading: action.payload,

            };
        
        case deviceTypes.EDIT_DEVICE_SUCCESS:

            return {

                ...state,
                updatedDevice: action.payload,

            };

        case deviceTypes.EDIT_DEVICE_LOADING:

            return {

                ...state,
                updateDeviceLoading: action.payload,

            };

        case deviceTypes.DEACTIVATE_DEVICE_SUCCESS:

            return {

                ...state,
                deactivatedDevice: action.payload,

            };

        case deviceTypes.DEACTIVATE_DEVICE_LOADING:

            return {

                ...state,
                deactivateDeviceLoading: action.payload,

            };
        default: return state;

    }

};

export default deviceReducer;
import deviceTypes from "./device.types";

const INITIAL_STATE = {
    fetchDeviceLoading: false,
    fetchedDevice: false,
    newDeviceLoading: false,
    newDevice: false,
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

        default: return state;

    }

};

export default deviceReducer;
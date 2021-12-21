import { CREATE_MEASURMENTS_SUCCESS, GET_MEASURMENTS_SUCCESS } from "../constants/measurement";

const initialState = {
    sort: "",
    dateStart: "",
    measurements: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MEASURMENTS_SUCCESS:
            return {
                sort: payload.sort,
                dateStart: payload.dateStart,
                measurements: payload.measurements
            }
        case CREATE_MEASURMENTS_SUCCESS:
            return {
                ...state,
                measurements: [payload.measurement, ...state.measurements]
            }
        default:
            return state;
    }
}
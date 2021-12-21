import EventBus from "../common/EventBus";
import { CREATE_MEASURMENTS_ERROR, CREATE_MEASURMENTS_SUCCESS, GET_MEASURMENTS_SUCCESS } from "../constants/measurement";
import measurementService from "../services/measurement.service";

export const getMeasurements = (id) => (dispatch) => {
    return measurementService.getMeasurements(id).then(
        (responce) => {
            dispatch({
                type: GET_MEASURMENTS_SUCCESS,
                payload: responce.data
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}

export const createMeasurement = (id) => (dispatch) => {
    return measurementService.createMeasurement(id).then(
        (responce) => {
            dispatch({
                type: CREATE_MEASURMENTS_SUCCESS,
                payload: { measurement: responce.data }
            });

            
            return Promise.resolve(responce.data);
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_MEASURMENTS_ERROR
            });

            return Promise.reject();
        }
    )
}

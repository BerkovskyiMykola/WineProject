import EventBus from "../common/EventBus";
import { CREATE_BARREL_ERROR, CREATE_BARREL_SUCCESS, DELETE_BARREL_ERROR, DELETE_BARREL_SUCCESS, EDIT_BARREL_ERROR, EDIT_BARREL_SUCCESS, GET_ACTIVE_BARRELS, GET_INACTIVE_BARRELS } from "../constants/barrel";
import { SET_MESSAGE } from "../constants/message";
import barrelService from "../services/barrel.service";

export const getActiveBarrels = () => (dispatch) => {
    return barrelService.getActiveBarrels().then(
        (responce) => {
            dispatch({
                type: GET_ACTIVE_BARRELS,
                payload: { activeBarrels: responce.data }
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

export const getInactiveBarrels = () => (dispatch) => {
    return barrelService.getInactiveBarrels().then(
        (responce) => {
            dispatch({
                type: GET_INACTIVE_BARRELS,
                payload: { inactiveBarrels: responce.data }
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

export const editBarrel = (barrelId, sort, amountMonth) => (dispatch) => {
    return barrelService.editBarrel(barrelId, sort, amountMonth).then(
        (responce) => {
            dispatch({
                type: EDIT_BARREL_SUCCESS,
                payload: { barrelId, sort, amountMonth }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_BARREL_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const createBarrel = (sort, amountMonth) => (dispatch) => {
    return barrelService.createBarrel(sort, amountMonth).then(
        (responce) => {
            dispatch({
                type: CREATE_BARREL_SUCCESS,
                payload: { barrel: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_BARREL_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deleteBarrel = (id) => (dispatch) => {
    return barrelService.deleteBarrel(id).then(
        (responce) => {
            dispatch({
                type: DELETE_BARREL_SUCCESS,
                payload: { barrelId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_BARREL_ERROR
            });

            return Promise.reject();
        }
    )
}
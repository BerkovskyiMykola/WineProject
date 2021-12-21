import { CREATE_BARREL_SUCCESS, DELETE_BARREL_SUCCESS, EDIT_BARREL_SUCCESS, GET_ACTIVE_BARRELS, GET_INACTIVE_BARRELS } from "../constants/barrel";

const initialState = {
    activeBarrels: [],
    inactiveBarrels: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ACTIVE_BARRELS:
            return {
                ...state,
                activeBarrels: payload.activeBarrels
            }
        case GET_INACTIVE_BARRELS:
            return {
                ...state,
                inactiveBarrels: payload.inactiveBarrels
            }
        case CREATE_BARREL_SUCCESS:
            return {
                ...state,
                activeBarrels: [...state.activeBarrels, payload.barrel]
            }
        case DELETE_BARREL_SUCCESS:
            return {
                ...state,
                activeBarrels: state.activeBarrels.filter(x => x.barrelId !== payload.barrelId)
            }
        case EDIT_BARREL_SUCCESS:
            return {
                ...state,
                activeBarrels: state.activeBarrels.map(barrel => {
                    if (barrel.barrelId === payload.barrelId)
                        return {
                            ...barrel,
                            sort: payload.sort,
                            amountMonth: payload.amountMonth
                        }
                    return barrel;
                })
            }
        default:
            return state;
    }
}
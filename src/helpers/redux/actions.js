import { SET_FURNITURE_DATA, SET_FURNITURE_LIST } from "./types";

export const furnitureDataAction = (text) => dispatch => {
    dispatch({
        type: SET_FURNITURE_DATA,
        data: text
    })
}

export const furnitureDataActionList = (data) => dispatch => {
    dispatch({
        type: SET_FURNITURE_LIST,
        data: data
    })
}
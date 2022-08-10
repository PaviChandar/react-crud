import { MergeTypeRounded } from "@mui/icons-material";
import * as types from "./actionType";

const initialState = {
    users : [],
    user : {},
    loading : true,
};

const userReducers = (state = initialState, action) =>{
    switch(action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users : action.payload,
                loading : false
            };
        case types.DELETE_USERS:
        case types.ADD_USERS:
        case types.UPDATE_USER:
        case types.SEARCH_USER:
            return{
                ...state,
                loading : false,
            };
        case types.GET_SINGLE_USER:
            return{
                ...state,
                user: action.payload,
                loading:false,
            }
        default:
            return state;
    }
};

export default userReducers;

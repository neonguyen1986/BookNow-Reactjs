import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //===============Gender================
        case actionTypes.FETCH_GENDER_START:
            // console.log('fetch start:', action)
            return {
                ...state,
                isLoadingGender: true,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                genders: action.payload,
                isLoadingGender: false,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                isLoadingGender: false,
            }
        //===============Position================
        case actionTypes.FETCH_POSITION_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                positions: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============Role================
        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                roles: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        //===============READ REDUX USER================
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            // console.log('fetch success:', action)
            return {
                ...state,
                users: action.payload,
                // isLoadingGender: false,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            // console.log('fetch fail:', action)
            return {
                ...state,
                // isLoadingGender: false,
            }
        default:
            return state;
    }
}

export default adminReducer;
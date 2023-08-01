import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService } from '../../services/userService'

//=================== Fetch Gender ====================
export const fetchGenderStart = () => async (dispatch, getState) => {
    try {
        //FETCH_GENDER_START: to show isLoadingGender
        dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("GENDER");
        if (res && res.errCode === 0) {
            dispatch(fetchGenderSuccess(res.data));
            // console.log('check getState:', getState)
            // console.log('check res:', res)
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch gender data';
            dispatch(fetchGenderFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchGenderFailed());
        console.log('>>>fetchGender error:', error);
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    payload: genderData,
})
export const fetchGenderFailed = (error) => ({
    type: actionTypes.FETCH_GENDER_FAILED,
    payload: error,
})

//=================== Fetch Position ====================
export const fetchPositionStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("POSITION");
        if (res && res.errCode === 0) {
            dispatch(fetchPositionSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch position data';
            dispatch(fetchPositionFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchPositionFailed());
        console.log('>>>fetch Position error:', error);
    }
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    payload: positionData,
})
export const fetchPositionFailed = (error) => ({
    type: actionTypes.FETCH_POSITION_FAILED,
    payload: error,
})
//=================== Fetch Role ====================
export const fetchRoleStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllCodeService("ROLE");
        if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to fetch role data';
            dispatch(fetchRoleFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchRoleFailed());
        console.log('>>>fetch Role error:', error);
    }
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    payload: roleData,
})
export const fetchRoleFailed = (error) => ({
    type: actionTypes.FETCH_ROLE_FAILED,
    payload: error,
})

//=================== CREATE NEW USER ====================
export const createNewUser = (data) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await createNewUserService(data);
        console.log('check create user Redux:', res)
        if (res && res.errCode === 0) {
            dispatch(saveUserSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to save user';
            dispatch(saveUserFailed(errorMessage));
        }
    } catch (error) {
        dispatch(saveUserFailed());
        console.log('>>>fetch Role error:', error);
    }
};

export const saveUserSuccess = (roleData) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    payload: roleData,
})
export const saveUserFailed = (error) => ({
    type: actionTypes.CREATE_USER_FAILED,
    payload: error,
})
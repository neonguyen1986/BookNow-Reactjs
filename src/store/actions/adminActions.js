import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService
}
    from '../../services/userService'

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
        // console.log('check create user Redux:', res)
        if (res && res.errCode === 0) {
            dispatch(saveUserSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to create user';
            dispatch(saveUserFailed(errorMessage));
        }
    } catch (error) {
        dispatch(saveUserFailed());
        console.log('>>>Create user error:', error);
    }
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = (error) => ({
    type: actionTypes.CREATE_USER_FAILED,
    payload: error,
})
//=================== READ USER ====================

export const fetchAllUsersStart = () => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllUsers("ALL");
        // console.log('check getAllUsers:', res)
        if (res && res.errCode === 0) {
            dispatch(fetchAllUsersSuccess(res.user));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to load user data';
            dispatch(fetchAllUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Load all users error:', error);
    }
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    payload: data,
})
export const fetchAllUsersFailed = (error) => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
    payload: error,
})

//=================== DELETE USER ====================
export const deleteUser = (data) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        let res = await deleteUserService(data);
        if (res && res.errCode === 0) {
            dispatch(delteUserSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to delete user';
            dispatch(delteUserFailed(errorMessage));
        }
    } catch (error) {
        dispatch(saveUserFailed());
        console.log('>>>Delete User error:', error);
    }
};

export const delteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const delteUserFailed = (error) => ({
    type: actionTypes.DELETE_USER_FAILED,
    payload: error,
})

//=================== UPDATE USER ====================
export const getUserStart = (id) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        const res = await getAllUsers(id);
        // console.log('check get one user:', res.user)
        if (res && res.errCode === 0) {
            dispatch(getUsersSuccess(res.user));
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to get user data';
            dispatch(getUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Get user data error:', error);
    }
};

export const getUsersSuccess = (data) => ({
    type: actionTypes.GET_USER_SUCCESS,
    payload: data,
})
export const getUsersFailed = (error) => ({
    type: actionTypes.GET_USER_FAILED,
    payload: error,
})
//============
export const updateUserStart = (data) => async (dispatch, getState) => {
    try {
        // //FETCH_GENDER_START: to show isLoadingGender
        // dispatch({ type: actionTypes.FETCH_GENDER_START });
        console.log('check data before:', data)
        const res = await editUserService(data);
        console.log('check data after:', res)
        if (res && res.errCode === 0) {
            dispatch(updateUsersSuccess());
        } else {
            const errorMessage = res?.message ? res.message : 'Failed to update user';
            dispatch(updateUsersFailed(errorMessage));
        }
    } catch (error) {
        dispatch(fetchAllUsersFailed());
        console.log('>>>Update user data error:', error);
    }
};

export const updateUsersSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})
export const updateUsersFailed = (error) => ({
    type: actionTypes.UPDATE_USER_FAILED,
    payload: error,
})
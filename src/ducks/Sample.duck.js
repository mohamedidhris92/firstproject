// actionTypes
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

//Reducer
const initialState = {
    allUsers: [],
    createUserError: null,
    createUserInProgress: false,
    isCreateUserSuccess: false,
};

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserInProgress: false,
                isCreateUserSuccess: true,
                allUsers: [...state.allUsers, action.payload], // Assuming action.payload is the new user data
                // Update the state as per your requirement
            };
        case CREATE_USER_ERROR:
            return {
                ...state,
                createUserInProgress: false,
                createUserError: action.payload,
            };
        default:
            return state;
    }
};

export default UsersReducer;

  // ================ Action creators // selectors ================ //

export const createUsersSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload: user,
});

export const createUsersError = (error) => ({
    type: CREATE_USER_ERROR,
    payload: error,
});

// ================ Thunks ================ //

export const createUser = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:4545/demo', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const val = await response.json();
            dispatch(createUsersSuccess(val));
        } catch (error) {
            dispatch(createUsersError(error.message));
        }
    };
};

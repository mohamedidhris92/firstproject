// actionTypes
//export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";


export const FETCH_USER_REQUEST = "FETCH_USER_SUCCESS";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
//export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

//Reducer
const initialState = {
  allUsers: [],
  fetchUsersInProgress : true,
  // createUserError: null,
  // createUserInProgress: false,
  // isCreateUserSuccess: false,
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {

      case CREATE_USER_SUCCESS:
          return {
              ...state,
              // createUserInProgress: false,
              // isCreateUserSuccess: true,
              allUsers: [...state.allUsers, action.payload], // Assuming action.payload is the new user data
              // Update the state as per your requirement
          };
      case DELETE_USER_SUCCESS:
          return {
              ...state,
              allUsers: [...state.allUsers, action.payload], 
          };

          case FETCH_USER_REQUEST:
            return{
              ...state,
              fetchUsersInProgress : true,
            };

          case FETCH_USER_SUCCESS:
            return{
              ...state,
              allUsers: {...state.allUsers, ...action.payload, fetchUsersInProgress : false},
            };
      default:
          return state;
  }
};

export default UsersReducer;

  // ================ Action creators ================ //
  export const fetchUsersRequest =  () => ({ type: FETCH_USER_REQUEST });

  export const fetchUsersSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
});

// export const createUsersError = (error) => ({
//     type: CREATE_USER_ERROR,
//     payload: error,
// });

  // ================ Thunks ================ //

  //create user

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
           // dispatch(createUsersSuccess(val));
        } catch (error) {
            //dispatch(createUsersError(error.message));
        }
    };
};

//Delete user

export const deleteUser = (id) => {
  return async (dispatch) => {
      try {
        const response = await fetch(`http://localhost:4545/demo/${id}`, { //here only declare the database name and this is the endpoint
        method: 'DELETE',
      })
  
  
          if (!response.ok) {
              throw new Error('Failed to create user');
          }

          const val = await response.json();
          console.log("val", val);
         // dispatch(createUsersSuccess(val));
      } catch (error) {
          //dispatch(createUsersError(error.message));
      }
  };
};

//Fetch Data
export const fetchUser = () => {
    dispatch(fetchUsersRequest());
  return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4545/demo', { //here only declare the database name and this is the endpoint
        method: 'GET',
      })
  
  
          if (!response.ok) {
              throw new Error('Failed to create user');
          }

          const val = await response.json();
          console.log("val", val);
          dispatch(fetchUsersSuccess(val));
      } catch (error) {
          //dispatch(createUsersError(error.message));
      }
  };
};

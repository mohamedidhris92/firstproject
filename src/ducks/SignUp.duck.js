// actionTypes
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


//Reducer
const initialState = {
    allUsers: [],
    oneUser: [],
    login:"",
  };

  const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          allUsers: [...state.allUsers, action.payload], // Assuming action.payload is the new user data
        };
        case LOGIN_SUCCESS:
            return {
              ...state,
              login: action.payload, // Assuming action.payload is the new user data
            };

        default:
      return state;
  }
};

export default UsersReducer;

// ================ Action creators ================ //
export const loginSuccess = (login) => ({
    type: LOGIN_SUCCESS,
    payload: login,
  });

// ================ Thunks ================ //


export const createUser = (data) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4546/demo/signup', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const statusCode = response.status;
        console.log("statuscode",statusCode);
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
  
        const val = await response.json();
        console.log("value",val);
        return val;         //  return the response value
        // dispatch(createUsersSuccess(val));
      } catch (error) {
        //dispatch(createUsersError(error.message));
      }
    };
  };

  
export const loginUser = (data) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:4546/demo/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
  
        const val = await response.json();
        console.log("valee",val);
         //dispatch(loginSuccess(val));
         return val;   // return the response value 
      } catch (error) {
        //dispatch(createUsersError(error.message));
      }
    };
  };
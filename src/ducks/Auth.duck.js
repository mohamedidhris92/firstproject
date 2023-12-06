// actionTypes
export const VALUE1 = "/VALUE1";

// actions  (we have to dispatch the value here only)
export const localValue = (payload) => {
//console.log("payload",payload);
    return {
      type: VALUE1,
      payload,
    };
  };
  // reducer
const initialState = {
    value : [],
  };
console.log("initialvalue",initialState);
  const Auth = (state = initialState, action) => {
    //console.log("state",state);
    
    switch (action.type) {
      case VALUE1:
        return {
          ...state,
         value: action.payload,      // to stored a single object 
        // value: [...state.value,action.payload],  // to stored a multiple object in an array
        };

      default:
        return state;
    }
  };
  
  export default Auth;
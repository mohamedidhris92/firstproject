import { combineReducers } from 'redux';
import Auth from './ducks/Auth.duck';
import Users from './ducks/Users.duck';

const rootReducer = combineReducers({
    auth: Auth, // 'auth' is the slice of state managed by authReducer // here we mention the duck names as what the store we want to display name
    Users:Users// Other reducers...
  });
  
  export default rootReducer;
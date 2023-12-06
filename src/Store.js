import { createStore, applyMiddleware } from 'redux'; // install these dependencies
import thunk from 'redux-thunk';// install these dependencies 
import rootReducer from './rootReducer';



const Store = createStore(
   rootReducer, // Replace 'rootReducer' with your combined reducers
  applyMiddleware(thunk)
);

export default Store;
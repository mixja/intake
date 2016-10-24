import {combineReducers} from 'redux';
import people from 'personReducer';

const rootReducer = combineReducers({
  people
});

export default rootReducer;

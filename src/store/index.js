import { combineReducers } from 'redux';
import common from 'modules/Commons/_store/commonSlice';
import auth from 'modules/Auth/_store/authSlice';

const rootReducer = combineReducers({
  common,
  auth,

});

export default rootReducer;

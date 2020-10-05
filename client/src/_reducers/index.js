import { combineReducers } from 'redux';
import user from './user_reducer';
import video from './video_reducers';
import comment from './comment_reduces';

const rootReducer = combineReducers({
  user,
  video,
  comment
});

export default rootReducer;
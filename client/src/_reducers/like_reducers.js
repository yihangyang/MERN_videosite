import {
  GETLIKES_LIKE,
  GETDISLIKES_LIKE,
  LIKE_LIKE,
  UNLIKE_LIKE,
  DISLIKE_LIKE,
  UNDISLIKE_LIKE,
} from '../_actions/types';


export default function(state={},action){
  switch(action.type){
    case GETLIKES_LIKE:
      return {...state, }
    case GETDISLIKES_LIKE:
      return {...state, }
    case LIKE_LIKE:
      return {...state, }
    case UNLIKE_LIKE:
      return {...state, videos: action.payload }
    case DISLIKE_LIKE:
      return {...state, video: action.payload }
    case UNDISLIKE_LIKE:
      return {...state, videos: action.payload }
    default:
      return state;
  }
}
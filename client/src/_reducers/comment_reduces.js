import {
  PUSHCOMMENT_COMMENT,
  GETCOMMENTS_COMMENT
} from '../_actions/types';


export default function(state={},action){
  switch(action.type){
    case PUSHCOMMENT_COMMENT:
      return {...state, }
    case GETCOMMENTS_COMMENT:
      return {...state, comments: action.payload }
    default:
      return state;
  }
}
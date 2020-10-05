import {
  SUBSCRIBENUMBER_SUBSCRIBE,
  SUBSCRIBED_SUBSCRIBE,
  SUBSCRIBE_SUBSCRIBE
} from '../_actions/types';


export default function(state={},action){
  switch(action.type){
    case SUBSCRIBENUMBER_SUBSCRIBE:
      return {...state, }
    case SUBSCRIBED_SUBSCRIBE:
      return {...state, }
    case SUBSCRIBE_SUBSCRIBE:
      return {...state, }
    default:
      return state;
  }
}
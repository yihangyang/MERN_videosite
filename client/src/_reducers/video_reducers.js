import {
  UPLOADFILES_VIDEO,
  THUMBNAIL_VIDEO,
  UPLOADVIDEO_VIDEO,
  GETVIDEOS_VIDEO,
  GETVIDEO_VIDEO,
  GETSUBSCRIPTIONVIDEOS_VIDEO
} from '../_actions/types';


export default function(state={},action){
  switch(action.type){
    case UPLOADFILES_VIDEO:
      return {...state, }
    case THUMBNAIL_VIDEO:
      return {...state, }
    case UPLOADVIDEO_VIDEO:
      return {...state, }
    case GETVIDEOS_VIDEO:
      return {...state, videos: action.payload }
    case GETVIDEO_VIDEO:
      return {...state, video: action.payload }
    case GETSUBSCRIPTIONVIDEOS_VIDEO:
      return {...state, videos: action.payload }
    default:
      return state;
  }
}
import axios from 'axios';
import {
  GETCOMMENTS_COMMENT,
  PUSHCOMMENT_COMMENT,
} from './types';
import { COMMENT_SERVER } from '../components/Config.js';


export function getComments(dataToSubmit) {
  const request = axios.post(`${COMMENT_SERVER}/getComments`, dataToSubmit)
    .then(res => res.data)
  return {
    type: GETCOMMENTS_COMMENT,
    payload: request
  }
}

export function pushComment(dataToSubmit) {
  const request = axios.post(`${COMMENT_SERVER}/pushComment`, dataToSubmit)
    .then(res => res.data)
  return {
    type: PUSHCOMMENT_COMMENT,
    payload: request
  }
}


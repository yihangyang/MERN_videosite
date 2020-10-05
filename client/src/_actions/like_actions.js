import axios from 'axios';
import {
  GETLIKES_LIKE,
  GETDISLIKES_LIKE,
  LIKE_LIKE,
  UNLIKE_LIKE,
  DISLIKE_LIKE,
  UNDISLIKE_LIKE,
} from './types';
import { LIKE_SERVER } from '../components/Config.js';


export function getLikes(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/getLikes`, dataToSubmit)
    .then(res => res.data)
  return {
    type: GETLIKES_LIKE,
    payload: request
  }
}

export function getDislikes(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/getDislikes`, dataToSubmit)
    .then(res => res.data)
  return {
    type: GETDISLIKES_LIKE,
    payload: request
  }
}

export function like(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/like`, dataToSubmit)
    .then(res => res.data)
  return {
    type: LIKE_LIKE,
    payload: request
  }
}

export function unlike(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/unlike`, dataToSubmit)
    .then(res => res.data)
  return {
    type: UNLIKE_LIKE,
    payload: request
  }
}

export function dislike(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/dislike`, dataToSubmit)
    .then(res => res.data)
  return {
    type: DISLIKE_LIKE,
    payload: request
  }
}

export function undislike(dataToSubmit) {
  const request = axios.post(`${LIKE_SERVER}/undislike`, dataToSubmit)
    .then(res => res.data)
  return {
    type: UNDISLIKE_LIKE,
    payload: request
  }
}


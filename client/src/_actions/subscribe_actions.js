import axios from 'axios';
import {
  SUBSCRIBENUMBER_SUBSCRIBE,
  SUBSCRIBED_SUBSCRIBE,
  SUBSCRIBE_SUBSCRIBE
} from './types';
import { SUBSCRIBE_SERVER } from '../components/Config.js';


export function subscribeNumber(dataToSubmit) {
  const request = axios.post(`${SUBSCRIBE_SERVER}/subscribeNumber`, dataToSubmit)
    .then(res => res.data)
  return {
    type: SUBSCRIBENUMBER_SUBSCRIBE,
    payload: request
  }
}

export function subscribed(dataToSubmit) {
  const request = axios.post(`${SUBSCRIBE_SERVER}/subscribed`, dataToSubmit)
    .then(res => res.data)
  return {
    type: SUBSCRIBED_SUBSCRIBE,
    payload: request
  }
}

export function subscribe(dataToSubmit) {
  const request = axios.post(`${SUBSCRIBE_SERVER}/subscribe`, dataToSubmit)
    .then(res => res.data)
  return {
    type: SUBSCRIBE_SUBSCRIBE,
    payload: request
  }
}
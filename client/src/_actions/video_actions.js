import axios from 'axios';
import {
  UPLOADFILES_VIDEO,
  THUMBNAIL_VIDEO,
  UPLOADVIDEO_VIDEO,
  GETVIDEOS_VIDEO,
  GETVIDEO_VIDEO,
  GETSUBSCRIPTIONVIDEOS_VIDEO
} from './types';
import { VIDEO_SERVER } from '../components/Config.js';


export function uploadfiles(dataToSubmit) {
  const request = axios.post(`${VIDEO_SERVER}/uploadfiles`, dataToSubmit)
    .then(res => res.data)
  return {
    type: UPLOADFILES_VIDEO,
    payload: request
  }
}

export function thumbnail(dataToSubmit) {
  const request = axios.post(`${VIDEO_SERVER}/thumbnail`, dataToSubmit)
    .then(res => res.data)
  return {
    type: THUMBNAIL_VIDEO,
    payload: request
  }
}

export function uploadVideo(dataToSubmit) {
  const request = axios.post(`${VIDEO_SERVER}/uploadVideo`, dataToSubmit)
    .then(res => res.data)
  return {
    type: UPLOADVIDEO_VIDEO,
    payload: request
  }
}

export function getVideos() {
  const request = axios.get(`${VIDEO_SERVER}/getVideos`)
    .then(res => res.data)
  return {
    type: GETVIDEOS_VIDEO,
    payload: request
  }
}

export function getVideo(dataToSubmit){
  const request = axios.post(`${VIDEO_SERVER}/getVideo`, dataToSubmit)
    .then(res => res.data)
  return {
    type: GETVIDEO_VIDEO,
    payload: request
  }
}

export function getSubscriptionVideos(dataToSubmit){
  const request = axios.post(`${VIDEO_SERVER}/getSubscriptionVideos`, dataToSubmit)
    .then(res => res.data)
  return {
    type: GETSUBSCRIPTIONVIDEOS_VIDEO,
    payload: request
  }
}


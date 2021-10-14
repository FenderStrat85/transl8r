import env from 'react-dotenv';
// const server = process.env.REACT_APP_SERVER_URL;
import { server } from '../constants/server';

// TODO: change server to env

const apiService: { [key: string]: any } = {};

apiService.register = (userInfo) => {
  return fetch(`${server}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error register', err));
};

apiService.login = (userInfo) => {
  return fetch(`${server}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.createJob = (jobInfos, jobType, accessToken) => {
  return fetch(`${server}/createJob/${jobType}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(jobInfos),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.acceptJob = (jobInfos, accessToken) => {
  return fetch(`${server}/acceptJob`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(jobInfos),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.fetchImage = (jobId, accessToken) => {
  return fetch(`${server}/getImageUrl/${jobId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error('error', err));
};

apiService.uploadTranslatedImage = (imageUrl, accessToken, jobId) => {
  console.log(imageUrl);
  console.log(accessToken);
  return fetch(`${server}/addTranslatedImage/${jobId}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(imageUrl),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;

//TODO: check env error
import env from 'react-dotenv';
// const server = process.env.REACT_APP_SERVER_URL;
const server = process.env.REACT_APP_SERVER;

const apiService: { [key: string]: any } = {};

apiService.register = (userInfo: any) => {
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

apiService.login = (userInfo: any) => {
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

apiService.createJob = (jobInfos: any, jobType: string, accessToken: any) => {
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

apiService.acceptJob = (jobInfos: any, accessToken: any) => {
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

apiService.fetchImage = (jobId: any, accessToken: any) => {
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

apiService.uploadTranslatedImage = (
  imageUrl: any,
  accessToken: any,
  jobId: any,
) => {
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

apiService.uploadTranslatedTextOfImage = (
  translatedText: string,
  accessToken: any,
  jobId: any,
) => {
  return fetch(`${server}/addTranslatedTextOfImage/${jobId}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(translatedText),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.fetchImageData = (jobId: any, accessToken: any) => {
  return fetch(`${server}/fetchImageData/${jobId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
};

apiService.createMessage = (messageData: any, accessToken: any) => {
  return fetch(`${server}/postMessage`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(messageData),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.getChatMessages = (jobId: any, accessToken: any) => {
  return fetch(`${server}/getChatMessages/${jobId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log('error', err));
};

apiService.changeStatus = (jobId: any, status: string, accessToken: any) => {
  return fetch(`${server}/changeStatus/${jobId}/${status}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;

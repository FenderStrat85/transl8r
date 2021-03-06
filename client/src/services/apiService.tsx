import { ICustomer, IJob, ILogin, ITranslator } from '../interfaces/interfaces';

// const server = process.env.REACT_APP_SERVER_URL;
const server = process.env.REACT_APP_SERVER;

const apiService: { [key: string]: any } = {};

apiService.register = (userInfo: ICustomer | ITranslator) => {
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

apiService.login = (userInfo: ILogin) => {
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

apiService.createJob = (
  jobInfos: IJob,
  jobType: string,
  accessToken: string,
) => {
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

apiService.getCustomerName = (jobId: string, accessToken: string) => {
  return fetch(`${server}/getCustomerName/${jobId}`, {
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

apiService.acceptJob = (jobInfos: IJob, accessToken: string) => {
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

apiService.deleteJob = (jobId: string, accessToken: string) => {
  return (
    fetch(`${server}/deleteJob/${jobId}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      // .then((res) => res.json())
      .catch((err) => console.log(err))
  );
};

apiService.setNotificationToFalse = (jobInfos: IJob, accessToken: string) => {
  return fetch(`${server}/setNotificationFalse`, {
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

apiService.fetchImage = (jobId: string, accessToken: string) => {
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
  imageUrl: string,
  accessToken: string,
  jobId: string,
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
  accessToken: string,
  jobId: string,
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

apiService.fetchImageData = (jobId: string, accessToken: string) => {
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

apiService.createMessage = (messageData: any, accessToken: string) => {
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

apiService.getChatMessages = (jobId: string, accessToken: string) => {
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

apiService.changeStatus = (
  jobId: string,
  status: string,
  accessToken: string,
) => {
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

apiService.isTokenValid = (accessToken: string) => {
  return fetch(`${server}/isTokenValid`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accessToken),
  })
    .then((res) => res.json())
    .catch((err) => console.log('error register', err));
};

export default apiService;

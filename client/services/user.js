/* eslint-disable no-console */
import axios from 'axios';

// Services
import firebase, { apiConfig } from 'services/firebase';

const attach = token => Object.assign({}, {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const getUserToken = () =>
  firebase
    .then(auth => auth.currentUser)
    .then(user => user.getIdToken())
    .catch((e) => {
      console.error('factories/tokenFactory/getUserToken', e);
    });

export const getUserByName = email =>
  Promise.all([
    getUserToken(),
    apiConfig
  ])
    .then(([token, {
      apiKey,
      rightsMgrHost,
      rightsMgrVersion
    }]) => axios({
      method: 'get',
      url: `${rightsMgrHost}/${rightsMgrVersion}/user?nameLike=${encodeURIComponent(email)}&key=${apiKey}`,
      headers: attach(token)
    }))
    .then((res) => {
      const { data: { users = [] } } = res;
      return users.shift();
    })
    .catch((e) => {
      console.error('services/api/getUserByName', e);
    });

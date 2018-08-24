/* eslint-disable no-console */
import firebase from 'services/firebase';

export const getUserToken = () =>
  firebase
    .then(auth => auth.currentUser)
    .then(user => user.getIdToken())
    .catch((e) => {
      console.error('factories/tokenFactory/getUserToken', e);
    });

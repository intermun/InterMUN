import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
//const db = admin.firestore();

exports.meme = functions.firestore
    .document('delegates/{delegateId}')
    .onCreate((snap, context) => {
      console.log(snap.data())
    });
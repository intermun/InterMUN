import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase)
const db = admin.firestore();

db.collection("delegates").onSnapshot((doc: any) => {
  console.log(doc.data());
})
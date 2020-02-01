import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
const db = admin.firestore();

exports.test = functions.https.onRequest(async (req, res) => {
  await db.collection("delegates").add({ test: "yes" });
  res.sendStatus(200);
});

exports.meme = functions.firestore.document('delegates/{delegateId}').onCreate((snap, context) => {
  console.log(snap.data())
})
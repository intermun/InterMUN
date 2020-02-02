import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key);

exports.meme = functions.firestore
  .document("delegates/{delegateId}")
  .onCreate((snap, context) => {
    const data: any = snap.data();
    const msg = {
      to: data.email,
      from: functions.config().sendgrid.from,
      subject: "Delegate Confirmation",
      templateId: functions.config().sendgrid.template,
      dynamic_template_data: {
        committee: data.committee,
        country: data.country,
        fullName: data.fullName,
        highSchool: data.highSchool
      }
    };
    return sgMail
      .send(msg)
      .then(e => {
        console.log(`mail sent successfully to ${data.email}`);
      })
      .catch(e => {
        console.error(e);
      });
  });

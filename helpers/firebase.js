import * as firebase from 'firebase';

let config = {
    apiKey: process.env.firebase_api_key,
    authDomain: process.env.firebase_auth_domain,
    databaseURL: process.env.firebase_database_url,
    projectId: process.env.firebase_project_id,
    storageBucket: process.env.firebase_storage_bucket,
    messagingSenderId: process.env.firebase_messaging_sender_id
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const admin = require('firebase-admin');

// Initialize Firebase Admin with your service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;


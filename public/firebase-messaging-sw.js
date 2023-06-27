// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js');
// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCaNMtlSmxykF-yZoTGGU6fRFOR_U9koBU',
  authDomain: 'testalaa-3a227.firebaseapp.com',
  projectId: 'testalaa-3a227',
  storageBucket: 'testalaa-3a227.appspot.com',
  messagingSenderId: '844877992016',
  appId: '1:844877992016:web:9d1143b2d68150a5264155',
  measurementId: 'G-14ZKWSMWNN'
}

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// import { getMessaging } from 'firebase/messaging'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app)

// eslint-disable-next-line
firebase.initializeApp(firebaseConfig)
// eslint-disable-next-line
const messaging = firebase.messaging()

messaging.getToken({ vapidKey: 'BO_z4fxtwD_L-TTQMh3OE7iIX77M2jezra4Kj7x9dI_nE8_OdLtmxUhJrvTOtS9sSClKqe1pEMA6gLNJr8sdfPY' })
  .then((currentToken) => {
    if (currentToken) {
      // eslint-disable-next-line
      console.warn('client token', currentToken)
      const channel = new BroadcastChannel('sw-fcm-token')
      channel.postMessage({ title: 'Hello from SW', fcm: currentToken })
    } else {
      // Show permission request UI
      const channel = new BroadcastChannel('sw-permission-request')
      channel.postMessage()
      // eslint-disable-next-line
      console.log('No registration token available. Request permission to generate one.')
      // ...
    }
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.warn('An error occurred while retrieving token. ', err)
    // ...
  })

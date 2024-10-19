import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';



export const firebaseConfig = {
    apiKey: "AIzaSyBFZx4t7jE2LzsgLUDzdkKsjhMEJcYzojw",
    authDomain: "eweb-50135.firebaseapp.com",
    projectId: "eweb-50135",
    storageBucket: "eweb-50135.appspot.com",
    messagingSenderId: "40693679741",
    appId: "1:40693679741:web:78843fef64cdef476a5314",
    measurementId: "G-HRQMNXGSGM"
  };


  const app=initializeApp(firebaseConfig);
  export const db=getFirestore(app);
  export const storage=getStorage(app);
  export const auth=getAuth(app);

//since you can access the instance of the app in all the other modules and code section console the options and after integrating the code
// in other components console.log(app.options)
  export default app;
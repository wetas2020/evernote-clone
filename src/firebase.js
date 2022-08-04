import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBDxtEWO_9vjiYknl7cd_qPJBrPGf5-i4w',
    authDomain: 'evernote-clone-d7942.firebaseapp.com',
    projectId: 'evernote-clone-d7942',
    storageBucket: 'evernote-clone-d7942.appspot.com',
    messagingSenderId: '194384248610',
    appId: '1:194384248610:web:e02234d7101c717a8d2f7b',
    measurementId: 'G-JNGGR61QHH'
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;

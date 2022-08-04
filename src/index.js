import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyBDxtEWO_9vjiYknl7cd_qPJBrPGf5-i4w',
    authDomain: 'evernote-clone-d7942.firebaseapp.com',
    projectId: 'evernote-clone-d7942',
    storageBucket: 'evernote-clone-d7942.appspot.com',
    messagingSenderId: '194384248610',
    appId: '1:194384248610:web:e02234d7101c717a8d2f7b',
    measurementId: 'G-JNGGR61QHH'
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('evernote-container'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

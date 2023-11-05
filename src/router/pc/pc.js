import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Ensure you have the firebase database module included
import firebaseConfig from '../../service/firebase.js'
const BioshockInfo = () => {
  const [bioshockInfo, setBioshockInfo] = useState(null);

  useEffect(() => {
    // Initialize Firebase app
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to bioshock game data
    const bioshockRef = firebase.database().ref('pc/bioshock');

    // Fetch Bioshock game data from Firebase
    bioshockRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setBioshockInfo(data);
    });

    // Unsubscribe from the data when the component unmounts
    return () => bioshockRef.off('value');
  }, []);

  // Check if bioshockInfo is being properly set
  console.log("info:",bioshockInfo);

  return (
    <div>
      <h1>Bioshock Game Information</h1>
      {bioshockInfo ? (
        <div>
          <h2>{bioshockInfo.gameTitle}</h2>
          <p>Age Rating: {bioshockInfo.ageRate}</p>
          <p>Consoles: {bioshockInfo.consoles.join(', ')}</p>
          <p>Description: {bioshockInfo.gameDescript}</p>
          <a href={bioshockInfo.steamLink} target="_blank" rel="noopener noreferrer">Steam Link</a>
        </div>
      ) : (
        <p>Loading Bioshock information...</p>
      )}
    </div>
  );
};

export default BioshockInfo;

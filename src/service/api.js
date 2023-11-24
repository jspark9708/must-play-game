import React from 'react';
import axios from 'axios';

let api = axios.create ({
    headers: {
        "Client-ID": process.env.REACT_APP_CLIENT_ID,
        "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`
    }    
})

export default api;
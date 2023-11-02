import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import styles from './main.module.css';

const Main = (props) => {
    let nav = useNavigate();

    return (
        <div>
            <br/><br/><br/><br/>
            <h1>Main Page Example</h1>
            <h3>Hi, this is main page of my project</h3>
        </div>
    );

};

export default Main;

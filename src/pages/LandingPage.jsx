import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../component/Navbar';
import { Helmet } from 'react-helmet';
    

const LandingPage = () => {
    return (
        <>
        <Helmet>
            <title>Landing Page</title>
        </Helmet>
        <div>
            <Navbar/>
            <h1>Landing Page</h1>
        </div>
        </>
    );
};


export default LandingPage;

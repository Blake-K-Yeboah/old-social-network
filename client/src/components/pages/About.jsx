import React from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import AboutHeader from '../AboutHeader';

import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div>
            <Helmet>
                <title>DevNetwork - About</title>
            </Helmet>
            <Navigation page='about' />
            <AboutHeader />
            <Footer type="small" />
        </div>
    )
}

export default About

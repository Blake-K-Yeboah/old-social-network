import React from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import AboutHeader from '../AboutHeader';

const About = () => {
    return (
        <div>
            <Navigation page='about' />
            <AboutHeader />
            <Footer type="small" />
        </div>
    )
}

export default About

import React from 'react'

import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import NotFoundHeader from '../NotFoundHeader';

const NotFound = () => {
    return (
        <React.Fragment>
            <Navigation />
            <NotFoundHeader />
            <Footer type="small" />
        </React.Fragment>
    )
}

export default NotFound;

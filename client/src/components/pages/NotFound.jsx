import React from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import NotFoundHeader from '../NotFoundHeader';

// Import Helmet
import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>DevNetwork - 404 Not Found</title>
            </Helmet>
            <Navigation />
            <NotFoundHeader />
            <Footer type="small" />
        </React.Fragment>
    )
}

export default NotFound;

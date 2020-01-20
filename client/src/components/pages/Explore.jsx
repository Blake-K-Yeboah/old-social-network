import React, { useEffect, useRef } from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';
import AccountControls from '../explore/AccountControls';
import AddAPost from '../explore/AddAPost';
import SuggestedUsers from '../explore/SuggestedUsers';
import Posts from '../explore/Posts';
import Footer from '../layout/Footer';

// Import React Bootstrap Components for layout
import { Row, Col, Container } from 'react-bootstrap';

// import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import Helmet
import { Helmet } from 'react-helmet';

const Explore = () => {

    // Define Contianer Ref
    let containerRef = useRef();

    // Define User
    let user = appStore.auth.user;

    // If The User has dark theme selected change container background color
    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            containerRef.current.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            containerRef.current.style.background = "#E9ECEF";
        }
    }, [user]);

    return (
        <div ref={containerRef}>
            <Helmet>
                <title>DevNetwork - Explore</title>
            </Helmet>
            <Navigation />
            <Container className="my-5">
                <Row>
                    <Col md={4} className="mb-5" >
                        <AccountControls />
                    </Col>
                    <Col md={8} className="mb-5">
                        <AddAPost />
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="mb-4">
                        <SuggestedUsers />
                    </Col>
                    <Col md={8}>
                        <Posts />
                    </Col>
                </Row>
            </Container>
            <Footer type="large" />
        </div>
    )
}

export default observer(Explore);

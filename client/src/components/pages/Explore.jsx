import React from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';

// Components

/* 
    -- AccountControls
    -- Add a post (MoreDetails - modal)
    -- Suggested Users (List of SmallUserItems)
    -- PostList (List of PostItems)
*/

import { Row, Col, Container } from 'react-bootstrap';
import AccountControls from '../explore/AccountControls';
import AddAPost from '../explore/AddAPost';
import SuggestedUsers from '../explore/SuggestedUsers';
import Posts from '../explore/Posts';

const Explore = () => {

    return (
        <div>
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
        </div>
    )
}

export default Explore

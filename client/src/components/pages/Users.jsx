import React from 'react'

import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import AccountControls from '../explore/AccountControls';
import UserList from '../explore/UserList';

import { Row, Col, Container } from 'react-bootstrap';

const Users = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Container className="my-5">
                <Row>
                    <Col md={4} className="mb-4">
                        <AccountControls />
                    </Col>
                    <Col md={8}>
                        <UserList />
                    </Col>
                </Row>
            </Container>
            <Footer type="small" />
        </React.Fragment>
    )
}

export default Users

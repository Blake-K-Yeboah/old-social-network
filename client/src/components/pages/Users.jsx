import React, { useEffect } from 'react'

import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import AccountControls from '../explore/AccountControls';
import UserList from '../explore/UserList';

import { Row, Col, Container } from 'react-bootstrap';

import appStore from '../../store';

import { observer } from 'mobx-react';

const Users = () => {

    // Define User
    let user = appStore.auth.user;

    // If The User has dark theme selected change container background color
    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            document.body.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            document.body.style.background = "#E9ECEF";
        }
    }, [user]);

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

export default observer(Users);

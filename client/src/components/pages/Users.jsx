import React, { useEffect } from 'react'

// Import Page Components
import Navigation from '../layout/Navbar';
import Footer from '../layout/Footer';
import AccountControls from '../explore/AccountControls';
import UserList from '../explore/UserList';

// Import Bootstrap Components
import { Row, Col, Container } from 'react-bootstrap';

// Import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import Helmet
import { Helmet } from 'react-helmet';

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
            <Helmet>
                <title>DevNetwork - Browse Users</title>
            </Helmet>
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

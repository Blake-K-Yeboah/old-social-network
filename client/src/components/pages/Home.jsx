import React from 'react'

// Import Page Components
import Navigation from '../layout/Navbar.jsx';
import Header from '../layout/Header.jsx';
import Footer from '../layout/Footer.jsx';
import SignUp from '../auth/SignUp.jsx';

// Import React-Bootstrap Components
import { Row, Container, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <Navigation page="home" />
            <Container className="h-100">
                <Row className="h-100">
                    <Col lg={8} style={{ top: '45%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
                        <Header />
                    </Col>
                </Row>
            </Container>
            <SignUp />
            <Footer type="small" />
        </div>
    )
}

export default Home;
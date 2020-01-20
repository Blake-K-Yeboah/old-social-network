import React, { useEffect, useRef } from 'react'

// Import appstore
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import page components
import Navigation from '../layout/Navbar';
import ProjectEditMenu from '../ProjectEditMenu';
import ProjectDeleteMenu from '../ProjectDeleteMenu';
import Footer from '../layout/Footer';

// Import React Bootstrap Components
import { Container, Row, Col } from 'react-bootstrap';

// Import Helmet
import { Helmet } from 'react-helmet';

const ProjectEdit = props => {
    // Define Contianer Ref
    let containerRef = useRef();

    // Define User
    let user = appStore.auth.user;

    useEffect(() => {

        // Fetch Posts
        appStore.fetchPosts();

        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            containerRef.current.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            containerRef.current.style.background = "#E9ECEF";
        }
    }, [user]);

    // Define Project
    const project = appStore.posts ? appStore.posts.filter(post => post._id === props.match.params.id)[0] : null;

    return (
        <div ref={containerRef}>
            <Helmet>
                <title>DevNetwork - Editing Project: {project ? project.title : 'Loading'}</title>
            </Helmet>
            <Navigation />
            <Container className="pt-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <ProjectEditMenu project={project} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <ProjectDeleteMenu id={project ? project._id : null} theme={user ? user.preferredTheme : null} />
                    </Col>
                </Row>
            </Container>
            <Footer type="large" />
        </div>
    )
}

export default observer(ProjectEdit);

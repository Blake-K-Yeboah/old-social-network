import React, { useEffect } from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import Navigation from '../layout/Navbar';
import Project from '../Project';
import Footer from '../layout/Footer';

import { Container, Row, Col, Spinner } from 'react-bootstrap';

const SingleProject = props => {

    useEffect(() => {
        appStore.fetchPosts();
    }, []);

    const project = appStore.posts ? appStore.posts.filter(post => post._id === props.match.params.id)[0] : null;

    return (
        <React.Fragment>
            <Navigation />
            <Container className="pt-5 mb-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        {project ? <Project project={project} /> : <Spinner animation="border" variant="danger" className="mx-auto my-2" />}
                    </Col>
                </Row>
            </Container>
            <Footer type="large" />
        </React.Fragment>
    )
}

export default observer(SingleProject);

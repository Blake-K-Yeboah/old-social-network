import React, { useEffect } from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import Navigation from '../layout/Navbar';
import ProjectEditMenu from '../ProjectEditMenu';

import { Container, Row, Col } from 'react-bootstrap';

const ProjectEdit = props => {

    useEffect(() => {
        appStore.fetchPosts();
    }, [])

    const project = appStore.posts ? appStore.posts.filter(post => post._id === props.match.params.id)[0] : null;

    return (
        <div>
            <Navigation />
            <Container className="pt-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <ProjectEditMenu project={project} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default observer(ProjectEdit);

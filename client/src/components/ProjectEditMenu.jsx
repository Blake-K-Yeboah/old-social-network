import React, { useRef } from 'react'

import appStore from '../store';

import { observer } from 'mobx-react';

import { Card, Spinner, Form, FormControl, InputGroup, Button, Row, ButtonGroup } from 'react-bootstrap';

import { FaTimes, FaCheck } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';

import axios from 'axios';

const ProjectEditMenu = props => {

    const { project } = props;

    const titleRef = useRef();
    const descRef = useRef();
    const tagsRef = useRef();
    const prevRef = useRef();
    const githubRef = useRef();

    const saveChangeHandler = () => {

        const body = {
            title: titleRef.current.value,
            description: descRef.current.value,
            tags: tagsRef.current.value,
            preview: `https://www.${prevRef.current.value}`,
            github: `https://github.com/${githubRef.current.value}`
        }

        if (body.preview === 'https://www.') body.preview = ''
        if (body.github === 'https://github.com/') body.github = ''

        axios.put(`/api/posts/${project._id}`, body, { 'Content-Type': 'application/json' }).then(res => {

            appStore.fetchPosts();

            alert('Succesfully Updated Project');

        }).catch(err => alert('There was an error. Try again later.'));

    }

    return (
        <React.Fragment>
            {project ? <Card className="mb-5">
                <Card.Img variant="top" src={`/uploads/projects/${project.img}`} />
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <label htmlFor="title">Title</label>
                            <FormControl type="text" id="title" placeholder="Title: " defaultValue={project.title} ref={titleRef} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="description">Description</label>
                            <FormControl type="text" id="description" placeholder="Description: " defaultValue={project.description} ref={descRef} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="tags">Tags</label>
                            <FormControl type="text" id="tags" placeholder="Tags: " defaultValue={project.tags} ref={tagsRef} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="github">Github Link</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>https://github.com/</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="github" defaultValue={project.github.substring(19)} ref={githubRef} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="preview">Preview Link</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>https://www.</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="preview" defaultValue={project.preview.substring(12)} ref={prevRef} />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Row className="justify-content-end pr-2">
                        <ButtonGroup>
                            <NavLink to={`/project/${project._id}`}>
                                <Button variant="secondary">Cancel <FaTimes style={{ marginLeft: '5px' }} /></Button>
                            </NavLink>
                            <Button variant="danger" className="ml-2 rounded-lg" onClick={saveChangeHandler}>Save Changes <FaCheck style={{ marginLeft: '5px' }} /></Button>
                        </ButtonGroup>
                    </Row>
                </Card.Footer>
            </Card>
                : <Spinner animation="border" variant="danger" className="mx-auto my-2" />}
        </React.Fragment>
    )
}

export default observer(ProjectEditMenu);

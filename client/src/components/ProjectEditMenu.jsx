import React, { useRef } from 'react'

// Import appStore
import appStore from '../store';

// Import observer
import { observer } from 'mobx-react';

// Import Bootstrap Components
import { Card, Spinner, Form, FormControl, InputGroup, Button, Row, ButtonGroup } from 'react-bootstrap';

// Import Icons
import { FaTimes, FaCheck } from 'react-icons/fa';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import Axios
import axios from 'axios';

// Import classNames
import classNames from 'classnames';

const ProjectEditMenu = props => {

    // Destructure Props
    const { project } = props;

    // Define input Ref
    const titleRef = useRef();
    const descRef = useRef();
    const tagsRef = useRef();
    const prevRef = useRef();
    const githubRef = useRef();

    // Save Changes
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

    // Define Dark Theme Condition
    const condition = appStore.auth.user.preferredTheme === 'Dark';

    // Define Input Class
    const inputClass = classNames({ 'bg-dark': condition, 'text-light': condition });

    // Define prepend Class
    const prependClass = classNames({ 'bg-secondary': condition, 'text-light': condition });

    return (
        <React.Fragment>
            {project ? <Card className={classNames("mb-5", { 'bg-dark': condition, 'text-light': condition })}>
                <Card.Img variant="top" src={`/uploads/projects/${project.img}`} />
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <label htmlFor="title">Title</label>
                            <FormControl type="text" id="title" placeholder="Title: " defaultValue={project.title} ref={titleRef} className={inputClass} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="description">Description</label>
                            <FormControl type="text" id="description" placeholder="Description: " defaultValue={project.description} ref={descRef} className={inputClass} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="tags">Tags</label>
                            <FormControl type="text" id="tags" placeholder="Tags: " defaultValue={project.tags} ref={tagsRef} className={inputClass} />
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="github">Github Link</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className={prependClass}>https://github.com/</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="github" defaultValue={project.github ? project.github.substring(19) : ''} ref={githubRef} className={inputClass} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <label htmlFor="preview">Preview Link</label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text className={prependClass}>https://www.</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="preview" defaultValue={project.preview ? project.preview.substring(12) : ''} ref={prevRef} className={inputClass} />
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

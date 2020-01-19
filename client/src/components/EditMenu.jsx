// Import React and certain hooks
import React, { useRef, useState, useEffect } from 'react'

// Import appStore
import appStore from '../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

// Import Bootstrap Components
import { Container, Row, Col, Card, Form, InputGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap'

// Import NavLink and Redirect from React Router
import { NavLink, Redirect } from 'react-router-dom';

// Import Axios for http requests
import axios from 'axios';

import classNames from 'classnames';

let EditMenu = () => {

    // Update Active User
    useEffect(() => {
        appStore.updateActiveUser();
    }, []);

    // Redirect state for redirection users back to user page
    const [redirect, setRedirect] = useState(false);

    // Refs for form Inputs
    const refs = {
        firstname: useRef(),
        lastname: useRef(),
        bio: useRef(),
        theme: useRef(),
        github: useRef(),
        portfolio: useRef(),
    }

    // Save Changes
    const saveChangeHandler = () => {
        // Define new User Object
        const newUser = {
            firstname: refs.firstname.current.value,
            lastname: refs.lastname.current.value,
            bio: refs.bio.current.value,
            preferredTheme: refs.theme.current.options[refs.theme.current.selectedIndex].value,
            github: refs.github.current.value,
            portfolio: refs.portfolio.current.value,
        }

        // Make a put request to back to update the user
        axios.put(`/api/users/${appStore.auth.user.id}`, newUser, { headers: { 'Content-Type': 'application/json' } }).then(res => {
            // Update Active User
            appStore.updateActiveUser();

            // Redirect User back to user page
            setRedirect('True');
        }).catch(err => alert(err.msg));

    }

    const condition = appStore.auth.user.preferredTheme === 'Dark';

    const inputClass = classNames({ 'bg-dark': condition, 'text-light': condition });

    const prependClass = classNames({ 'bg-secondary': condition, 'text-light': condition });

    return (
        <React.Fragment>
            {redirect ? <Redirect to={`/user/${appStore.auth.user.id}`} />
                : (<Container className="mb-5">
                    <h1 className={classNames("text-center", "display-4", "py-5", { 'text-light': condition })}>Edit Profile</h1>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className={classNames({ 'bg-dark': condition, 'text-light': condition })}>
                                <Card.Header>
                                    <small>Account ID: {appStore.auth.user.id}</small>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <InputGroup className="mb-4 mt-3">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>First and last name</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl defaultValue={appStore.auth.user.firstname} ref={refs.firstname} className={inputClass} />
                                            <FormControl defaultValue={appStore.auth.user.lastname} ref={refs.lastname} className={inputClass} />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>Bio</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl defaultValue={appStore.auth.user.bio} placeholder="No Bio" ref={refs.bio} className={inputClass} />
                                        </InputGroup>
                                        <InputGroup className="mb-1">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>Email</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl defaultValue={appStore.auth.user.email} type="email" disabled className={inputClass} />
                                        </InputGroup>
                                        <small className="text-muted">You cannot change your account email address.</small>

                                        <InputGroup className="my-4">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>Theme</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl as="select" ref={refs.theme} className={inputClass}>
                                                <option>Light</option>
                                                {appStore.auth.user.preferredTheme === 'Dark' ? <option selected>Dark</option> : <option>Dark</option>}
                                            </FormControl>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>Github</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl defaultValue={appStore.auth.user.github} placeholder="No Github" ref={refs.github} className={inputClass} />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text className={prependClass}>Portfolio</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl defaultValue={appStore.auth.user.portfolio} placeholder="No Portfolio" ref={refs.portfolio} className={inputClass} />
                                        </InputGroup>
                                    </Form>
                                    <p className="lead">It may take a minute for changes to take effect.</p>
                                </Card.Body>
                                <Card.Footer>
                                    <Row className="justify-content-end pr-2">
                                        <ButtonGroup>
                                            <NavLink to={`/user/${appStore.auth.user.id}`}>
                                                <Button variant="secondary">Cancel</Button>
                                            </NavLink>
                                            <Button variant="danger" className="ml-2 rounded-lg" onClick={saveChangeHandler}>Save Changes</Button>
                                        </ButtonGroup>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>)}
        </React.Fragment>

    )
}

export default observer(EditMenu)

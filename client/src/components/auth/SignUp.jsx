import React, { useState } from 'react'

// Import appStore
import appStore from '../../store';

// Import Observer from mobx-react
import { observer } from 'mobx-react';

// Import React-bootstrap components
import { Modal, Button, Form, Col, FormControl, Alert } from 'react-bootstrap';

// Import axios
import axios from 'axios';

// Import classnames
import classNames from 'classnames';

import { FaUserPlus, FaTimes } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

let SignUp = () => {

    const [userInput, setUserInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const signUpHandler = () => {
        axios
            .post("/api/users/register", userInput)
            .then(res => {
                // Successfull register

                // CLose Sign Up Modal
                appStore.closeSignUpModal();

                alert('Successfully Registered! You can now login');

                appStore.setUserInput(userInput);


            })
            .catch(err => {
                appStore.setError(Object.values(err.response.data)[0]);
            });
    }

    const changeHandler = e => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value });
    }

    const closeHandler = () => {
        appStore.closeSignUpModal();
        appStore.setError(false);
    }

    let classes = {};

    classes['d-none'] = !appStore.auth.error;

    return (
        <Modal show={appStore.signUpModalStatus} onHide={closeHandler} centered>
            <Modal.Header closeButton>
                <Modal.Title className="font-weight-normal">Create an account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger" className={classNames(classes)}>
                    <GoAlert style={{marginRight: '5px'}}/> {appStore.auth.error}
                </Alert>
                <Form>
                    <Form.Row className="mb-4">
                        <Col>
                            <FormControl type="text" id="firstname" placeholder="First Name:" defaultValue={userInput.firstname} onChange={changeHandler} />
                        </Col>
                        <Col>
                            <FormControl type="text" id="lastname" placeholder="Last Name: " defaultValue={userInput.lastname} onChange={changeHandler} />
                        </Col>
                    </Form.Row>
                    <Form.Row className="mb-3">
                        <Form.Group className="col">
                            <FormControl type="email" id="email" placeholder="Email: " defaultValue={userInput.email} onChange={changeHandler} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col">
                            <FormControl type="password" id="password" placeholder="Password: " defaultValue={userInput.password} onChange={changeHandler} />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeHandler}>
                    Close <FaTimes style={{marginLeft: '5px'}}/>
                </Button>
                <Button variant="danger" onClick={signUpHandler}>
                    Sign Up <FaUserPlus style={{marginLeft: '5px'}}/>
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

SignUp = observer(SignUp);

export default SignUp

// Import React and useState hook
import React, { useState } from 'react'

// Import AppStore
import appStore from '../store';

// Import Observer from Mobx-React
import { observer } from 'mobx-react';

// Import Bootstrap components
import { Container, Card, Form, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap';

// Import Axios to make http requests
import axios from 'axios';

const UploadProfilePic = () => {

    // File State to store user's uploaded file
    const [file, setFile] = useState('');

    // File Name State to store user's uploaded file name
    const [fileName, setFileName] = useState('Choose File');

    // Error State To store potential errors
    const [error, setError] = useState(null);

    // For File Input Changes
    const onChange = e => {

        // Set File State to file
        setFile(e.target.files[0]);

        // Set File Name
        setFileName(e.target.files[0].name);

    };

    // Handle Form Submission
    const submitHandler = e => {

        // Prevent Form From Submitting
        e.preventDefault();

        // Define formData
        const formData = new FormData();

        // Append File on to formData
        formData.append('file', file);

        // Make Post Request to backend api
        axios.post(`/api/users/${appStore.auth.user.id}/profilepic`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                appStore.updateActiveUser();
                alert('Succesfully Uploads profile Picture');
                setError(null);
            }).catch(err => {
                setError('There Was An Error');
            })
    }
    return (
        <Container className="mb-5">
            <h1 className="display-4 text-center mb-5">Upload Profile Picture</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Alert variant="danger" className={!error ? 'd-none' : ''}>
                                {error}
                            </Alert>
                            <Form onSubmit={submitHandler}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="ProfilePictureUploadPrepend">Upload</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="ProfilePictureUpload" onChange={onChange} />
                                        <label className="custom-file-label" htmlFor="ProfilePictureUpload">{fileName}</label>
                                    </div>
                                </InputGroup>
                                <p className="text-center">
                                    <Button type="submit" variant="danger">Upload</Button>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

// Export Component as an observer
export default observer(UploadProfilePic);

import React, { useState } from 'react'

import { Card, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';

import MoreDetails from './MoreDetails';

import appStore from '../../store';

import { observer } from 'mobx-react';

import axios from 'axios';

const AddAPost = () => {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        tags: '',
        github: '',
        preview: ''
    });
    const [error, setError] = useState(null);

    // For Add Details Modal
    const [show, setShow] = useState(false);

    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    // For File Input Changes
    const onChange = e => {

        setFile(e.target.files[0]);

        setFileName(e.target.files[0].name);

    };

    const titleOnChange = e => {
        setUserInput({
            ...userInput,
            title: e.target.value
        });
    }

    const postProject = () => {

        // Define formData
        const formData = new FormData();

        // Append File on to formData
        formData.append('file', file);

        let name = `${appStore.auth.user.firstname} ${appStore.auth.user.lastname}`;
        let id = appStore.auth.user.id;

        let data = {
            ...userInput,
            usersName: name,
            userId: id
        }

        //formData.append('data', data);
        Object.entries(data).forEach(entry => {
            formData.append(entry[0], entry[1]);
        });

        axios.post('/api/posts/', formData).then(res => {
            console.log(res.data);
        }).catch(err => {
            let msg = Object.values(err.response.data)[0];
            setError(msg);
        })
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Header className="pt-4 pl-4">
                    <h2 className="font-weight-light">Post Your Project</h2>
                </Card.Header>
                <Card.Body>
                    <Alert variant="danger" className={!error ? 'd-none' : ''}>
                        {error}
                    </Alert>
                    <Form onSubmit={e => e.preventDefault()}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PictureUploadPrepend">Picture</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="PictureUpload" onChange={onChange} />
                                <label className="custom-file-label" htmlFor="PictureUpload">{fileName}</label>
                            </div>
                        </InputGroup>
                        <Form.Group>
                            <label htmlFor="title">Title</label>
                            <FormControl type="text" placeholder="Title: " id="title" onChange={titleOnChange} defaultValue={userInput.title} />
                        </Form.Group>
                        <Form.Group>
                            <span className="text-danger" style={{ cursor: "pointer" }} onClick={handleOpen} >Add More Details</span>
                        </Form.Group>
                    </Form>
                    <Button variant="danger" onClick={postProject}>Post Project</Button>
                </Card.Body>
            </Card>
            <MoreDetails userInput={userInput} setUserInput={setUserInput} handleClose={handleClose} show={show} />
        </React.Fragment>
    )
}

export default observer(AddAPost)

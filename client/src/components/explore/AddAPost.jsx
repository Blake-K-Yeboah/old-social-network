import React, { useState } from 'react'

// Import React bootstrap components
import { Card, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';

// More details modal
import MoreDetails from './MoreDetails';

// Import appStore
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import Axios
import axios from 'axios';

// Import classNames
import classNames from 'classnames';

// Import Icons
import { FaPlus } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';

const AddAPost = () => {

    // Deifne File State
    const [file, setFile] = useState('');

    // Define Filename state
    const [fileName, setFileName] = useState('Choose File');

    // Define userInput state
    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        tags: '',
        github: '',
        preview: ''
    });

    // Define Error State
    const [error, setError] = useState(null);

    // For Add Details Modal
    const [show, setShow] = useState(false);

    // Open and Close Modal Handlers
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    // For File Input Changes
    const onChange = e => {

        setFile(e.target.files[0]);

        setFileName(e.target.files[0].name);

    };

    // Handle Title Input Change
    const titleOnChange = e => {
        setUserInput({
            ...userInput,
            title: e.target.value
        });
    }

    /// Post Project function
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

        Object.entries(data).forEach(entry => {
            formData.append(entry[0], entry[1]);
        });

        axios.post('/api/posts/', formData).then(res => {
            console.log(res.data);
            appStore.fetchPosts();
        }).catch(err => {
            let msg = Object.values(err.response.data)[0];
            setError(msg);
        })
    }

    // Define theme
    const theme = appStore.auth.user.preferredTheme;

    // Define Dark Condition
    const condition = theme === 'Dark';

    return (
        <React.Fragment>
            <Card className={classNames({ 'bg-dark': condition, 'text-light': condition })}>
                <Card.Header className="pt-4 pl-4">
                    <h2 className="font-weight-light">Post Your Project</h2>
                </Card.Header>
                <Card.Body>
                    <Alert variant="danger" className={!error ? 'd-none' : ''}>
                        <GoAlert style={{ marginRight: '5px' }} /> {error}
                    </Alert>
                    <Form onSubmit={e => e.preventDefault()}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="PictureUploadPrepend" className={classNames({ 'bg-secondary': condition })}>Picture</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div className="custom-file">
                                <input type="file" className={classNames("custom-file-input", { 'bg-dark': condition })} id="PictureUpload" onChange={onChange} />
                                <label className={classNames("custom-file-label", { 'bg-dark': condition, 'text-light': condition && fileName !== 'Choose File' })} htmlFor="PictureUpload">{fileName}</label>
                            </div>
                        </InputGroup>
                        <Form.Group>
                            <label htmlFor="title">Title</label>
                            <FormControl type="text" placeholder="Title: " id="title" onChange={titleOnChange} defaultValue={userInput.title} className={condition ? 'bg-dark text-light' : ''} />
                        </Form.Group>
                        <Form.Group>
                            <span className="text-danger" style={{ cursor: "pointer" }} onClick={handleOpen} >Add More Details</span>
                        </Form.Group>
                    </Form>
                    <Button variant="danger" onClick={postProject}>Post Project <FaPlus style={{ marginLeft: '5px', marginTop: '-2px' }} /></Button>
                </Card.Body>
            </Card>
            <MoreDetails userInput={userInput} setUserInput={setUserInput} handleClose={handleClose} show={show} />
        </React.Fragment>
    )
}

export default observer(AddAPost);

import React, { useState } from 'react'

import { Card, Form, FormControl, InputGroup, Button } from 'react-bootstrap';

import MoreDetails from './MoreDetails';

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

    return (
        <React.Fragment>
            <Card>
                <Card.Header className="pt-4 pl-4">
                    <h2 className="font-weight-light">Post Your Project</h2>
                </Card.Header>
                <Card.Body>
                    <Form>
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
                        <Button variant="danger">Post Project</Button>
                    </Form>
                </Card.Body>
            </Card>
            <MoreDetails userInput={userInput} setUserInput={setUserInput} handleClose={handleClose} show={show} />
        </React.Fragment>
    )
}

export default AddAPost

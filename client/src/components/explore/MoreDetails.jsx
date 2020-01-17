import React, { useRef } from 'react';

import { Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';

const MoreDetails = props => {

    const descRef = useRef();
    const tagsRef = useRef();
    const prevRef = useRef();
    const githubRef = useRef();

    const addDetails = () => {

        const newInput = {
            ...props.userInput,
            description: descRef.current.value,
            tags: tagsRef.current.value,
            preview: `https://www.${prevRef.current.value}`,
            github: `https://github.com/${githubRef.current.value}`
        }

        if (newInput.preview === 'https://www.') newInput.preview = '';

        if (newInput.github === 'https://github.com/') newInput.github = '';

        props.setUserInput(newInput);

        props.handleClose()
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add More Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <label htmlFor="description">Description</label>
                        <FormControl type="text" id="description" placeholder="Description: " defaultValue={props.userInput.description} ref={descRef} />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="tags">Tags</label>
                        <FormControl type="text" id="tags" placeholder="Tags: " defaultValue={props.userInput.tags} ref={tagsRef} />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="github">Github Link</label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>https://github.com/</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" id="github" defaultValue={props.userInput.github.substring(19)} ref={githubRef} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="preview">Preview Link</label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>https://www.</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" id="preview" defaultValue={props.userInput.preview.substring(12)} ref={prevRef} />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
          </Button>
                <Button variant="danger" onClick={addDetails}>
                    Add Details
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoreDetails
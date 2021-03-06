import React from 'react'

// Import Bootstrap Components
import { Card, Button } from 'react-bootstrap';

// Import Icons
import { GoAlert } from 'react-icons/go';
import { MdDeleteForever } from 'react-icons/md';

// Import Axios
import axios from 'axios';

// Import classNames
import classNames from 'classnames';

const ProjectDeleteMenu = props => {

    // Function to delete Project
    const deleteProject = () => {
        axios.delete(`/api/posts/${props.id}`).then(res => {
            window.history.replaceState('explore', 'DevNetwork - Explore', '/explore');
            window.location.reload();
        }).catch(err => console.error(err));
    }

    // Dark Theme COndition
    const condition = props.theme === 'Dark';

    return (
        <React.Fragment>
            <Card className={classNames("text-center", "mb-5", { 'bg-dark': condition, 'text-light': condition })}>
                <Card.Header><GoAlert style={{ marginRight: '5px' }} />Danger Zone</Card.Header>
                <Card.Body>
                    <Card.Title>Delete This Project</Card.Title>
                    <Card.Text>
                        Are you sure you want to delete this project? There is no going back.
                  </Card.Text>
                    <Button variant="danger" onClick={deleteProject}>Delete Project <MdDeleteForever style={{ marginLeft: '5px' }} /></Button>
                </Card.Body>
                <Card.Footer className="text-muted">Project ID: {props.id}</Card.Footer>
            </Card>
        </React.Fragment>
    )
}

export default ProjectDeleteMenu

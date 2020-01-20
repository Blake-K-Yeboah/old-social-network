import React, { useState } from 'react'

// Import Store
import appStore from '../../store';

// Import Observer
import { observer } from 'mobx-react';

// Import Bootstrap Components
import { Card, Media, Button, ListGroup } from 'react-bootstrap';

// Import NavLink and redirect from react routrer dom
import { NavLink, Redirect } from 'react-router-dom';

// Import axios
import axios from 'axios';

// Import classnames
import classNames from 'classnames';

// Import Icon
import { GoSignOut } from 'react-icons/go';

const AccountControls = () => {

    // Define User
    const user = appStore.auth.user;

    // Define Redirect Status
    const [redirect, setRedirect] = useState(false);

    // Handle Logout
    const logOutHandler = () => {

        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        delete axios.defaults.headers.common["Authorization"];

        // Set current user to empty object {} which will set isAuthenticated to false
        appStore.setCurrentUser(null)

        // Set User Input to empty obj
        appStore.setUserInput({});

        // Redirect User
        setRedirect(true);
    }

    // Define User's theme
    const theme = appStore.auth.user.preferredTheme;

    // Define Dark Theme condition for conditional classes
    const condition = theme === 'Dark';

    return (
        <React.Fragment>

            {redirect ? <Redirect to="/" />
                : <Card className={classNames({ 'text-light': condition, 'bg-dark': condition })}>

                    <Card.Header className='py-4'>

                        <Media>

                            <img src={`/uploads/profile/${user.profileIcon}`} alt={`${user.firstname} Profile Icon`} className="mr-3" style={{ width: '64px', borderRadius: '50%' }} />

                            <Media.Body>

                                <h5 className='mt-0'>{`${user.firstname} ${user.lastname}`}</h5>

                                {user.bio ? user.bio : 'No Bio'}

                            </Media.Body>

                        </Media>

                    </Card.Header>

                    <Card.Body className="text-center">

                        <ListGroup className="mt-3 mb-5" variant="flush">

                            <NavLink className={classNames("list-group-item", { 'text-dark': !condition, 'text-light': condition, 'bg-dark': condition })} to={`/user/${user.id}`}>View Profile</NavLink>

                            <NavLink className={classNames("list-group-item", { 'text-dark': !condition, 'text-light': condition, 'bg-dark': condition })} to={`/user/edit/${user.id}`}>Edit Profile</NavLink>

                        </ListGroup>

                        <Button variant="danger" onClick={logOutHandler}>Logout <GoSignOut style={{ marginLeft: '5px' }} /></Button>
                    </Card.Body>

                </Card>

            }

        </React.Fragment>
    )
}

export default observer(AccountControls);
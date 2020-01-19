import React, { useState } from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import { Card, Media, Button, ListGroup } from 'react-bootstrap';

import { NavLink, Redirect } from 'react-router-dom';

import axios from 'axios';

import classNames from 'classnames';

let AccountControls = () => {

    const user = appStore.auth.user;

    const [redirect, setRedirect] = useState(false);

    const logOutHandler = () => {

        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        delete axios.defaults.headers.common["Authorization"];

        // Set current user to empty object {} which will set isAuthenticated to false
        appStore.setCurrentUser(null)

        appStore.setUserInput({});

        setRedirect(true);
    }

    const theme = appStore.auth.user.preferredTheme;

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

                        <Button variant="danger" onClick={logOutHandler}>Logout</Button>
                    </Card.Body>

                </Card>

            }

        </React.Fragment>
    )
}

AccountControls = observer(AccountControls);

export default AccountControls;

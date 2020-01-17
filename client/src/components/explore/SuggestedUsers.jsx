import React, { useEffect } from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import { Card, Media, Spinner, ListGroup, Button } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

let SuggestedUsers = () => {

    useEffect(() => {
        appStore.fetchUsers();
    }, []);

    const parse = obj => {
        return JSON.parse(JSON.stringify(obj))
    }

    const users = appStore.users;

    const activeUsers = users ? parse(users).filter(user =>  user._id !== parse(appStore.auth.user).id) : null;

    return (
        <Card>
            <Card.Header>
                Suggested Users
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {users ? activeUsers.map((user, index) => {
                        return (
                            <ListGroup.Item key={user._id} className={index === 1 ? 'py-3' : 'pb-2'}>
                                <Media>

                                    <img src={`/uploads/profile/${user.profileIcon}`} alt={`${user.firstname} Profile Icon`} className="mr-3 mt-1" style={{ width: '48px', borderRadius: '50%' }} />

                                    <Media.Body>

                                        <h5 className="mt-0">

                                            <NavLink to={`/user/${user._id}`} className="text-dark">

                                                {`${user.firstname} ${user.lastname}`}

                                            </NavLink>

                                        </h5>

                                        {user.bio ? user.bio : 'No Bio'}

                                    </Media.Body>

                                </Media>
                            </ListGroup.Item>
                        )
                    }) : <Spinner animation="border" variant="danger" className="mx-auto my-2" />}
                </ListGroup>

            </Card.Body>

            <Card.Footer>

                <div className="text-center">

                    <NavLink to="/users/" className="text-light">

                        <Button variant="danger">

                            View All


                        </Button>

                    </NavLink>

                </div>

            </Card.Footer>

        </Card>
    )
}

SuggestedUsers = observer(SuggestedUsers);

export default SuggestedUsers

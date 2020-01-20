import React, { useEffect } from 'react'

// Import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import React bootstrap Components
import { Card, Media, Spinner, ListGroup, Button } from 'react-bootstrap';

// Import NavLink
import { NavLink } from 'react-router-dom';

// Import classNames
import classNames from 'classnames';

// Import Icons
import { FaUsers } from 'react-icons/fa';

const SuggestedUsers = () => {

    // Fetch Users
    useEffect(() => {
        appStore.fetchUsers();
    }, []);

    // Define Users
    const users = appStore.users;

    // Define Active User (first 3 not including logged in) to be displayed
    const activeUsers = users ? users.filter(user => user._id !== appStore.auth.user.id) : null;

    // Define Theme
    const theme = appStore.auth.user.preferredTheme;

    // Define Dark Theme Condition
    const condition = theme === "Dark";

    return (
        <Card className={classNames({ 'bg-dark': condition, 'text-light': condition })}>
            <Card.Header>
                Suggested Users
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {users ? activeUsers.slice(0, 3).map((user, index) => {
                        return (
                            <ListGroup.Item key={user._id} className={classNames({ 'py-3': index === 1, 'pb-2': index !== 1, 'bg-dark': condition })}>
                                <Media>

                                    <img src={`/uploads/profile/${user.profileIcon}`} alt={`${user.firstname} Profile Icon`} className="mr-3 mt-1" style={{ width: '48px', borderRadius: '50%' }} />

                                    <Media.Body>

                                        <h5 className="mt-0">

                                            <NavLink to={`/user/${user._id}`} className={classNames({ "text-dark": !condition, "text-light": condition })}>

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

                            View All <FaUsers style={{ marginLeft: '5px' }} />


                        </Button>

                    </NavLink>

                </div>

            </Card.Footer>

        </Card>
    )
}

export default observer(SuggestedUsers);
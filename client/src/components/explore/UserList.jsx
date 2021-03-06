import React, { useEffect } from 'react'

// Import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import Navlink
import { NavLink } from 'react-router-dom';

// Import React Bootstrap Components
import { ListGroup, Media, Spinner } from 'react-bootstrap';

// Import classNames
import classNames from 'classnames';

const UserList = () => {

    // Fetch Users
    useEffect(() => {
        appStore.fetchUsers();
    }, []);

    // Define Users
    const users = appStore.users;

    // Define DarkTHeme Condition
    const condition = appStore.auth.user.preferredTheme === 'Dark';

    return (
        <React.Fragment>
            <h1 className={classNames("display-4", { 'text-light': condition })}>Browse Users</h1>

            <ListGroup>
                {users ? users.map(user => {

                    const activeUserCondition = user._id === appStore.auth.user.id;

                    return (
                        <ListGroup.Item key={user._id} className={classNames("py-3", { 'bg-dark': condition })} variant={activeUserCondition ? 'secondary' : 'light'}>
                            <Media>

                                <img src={`/uploads/profile/${user.profileIcon}`} alt={`${user.firstname} Profile Icon`} className="mr-3" style={{ width: '64px', borderRadius: '50%' }} />

                                <Media.Body className={classNames({ 'text-muted': condition })}>

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

        </React.Fragment>
    )
}

export default observer(UserList);
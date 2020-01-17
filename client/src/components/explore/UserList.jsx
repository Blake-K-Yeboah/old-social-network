import React, {useEffect} from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import { NavLink } from 'react-router-dom';

import { ListGroup, Media, Spinner } from 'react-bootstrap';

let UserList = () => {

    useEffect(() => {
        appStore.fetchUsers();
    }, []);

    const users = appStore.users;

    return (
        <React.Fragment>
            <h1 className="display-4">Browse Users</h1>
            
            <ListGroup>
                    {users ? users.map(user => {
                        return (
                            <ListGroup.Item key={user._id} className="py-3" variant={user._id === appStore.auth.user.id ? 'secondary' : 'light'}>
                                <Media>

                                    <img src={`/uploads/profile/${user.profileIcon}`} alt={`${user.firstname} Profile Icon`} className="mr-3" style={{ width: '64px', borderRadius: '50%' }} />

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
            
        </React.Fragment>
    )
}

UserList = observer(UserList);

export default UserList
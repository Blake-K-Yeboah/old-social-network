import React, { useEffect } from 'react';

import appStore from '../../store';

import { observer } from 'mobx-react';

import Navigation from '../layout/Navbar';
import ProfileHeader from '../ProfileHeader';
import SuggestedUsers from '../explore/SuggestedUsers';

import { Container, Row, Col } from 'react-bootstrap';

let SingleUser = props => {

    useEffect(() => {
        appStore.fetchUsers();
    }, []);

    const activeUser = appStore.users ? appStore.users.filter(user => user._id === props.match.params.id)[0] : null;

    return (
        <div>
            <Navigation />
            <ProfileHeader activeUser={activeUser} />
            <Container className="mt-5">
                <Row>
                    <Col md={8}>
                        {/* Users Post Component here*/}
                    </Col>
                    <Col md={4}>
                        <SuggestedUsers />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

SingleUser = observer(SingleUser);

export default SingleUser;
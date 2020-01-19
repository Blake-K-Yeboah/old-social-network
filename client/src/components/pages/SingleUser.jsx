import React, { useEffect, useRef } from 'react';

import appStore from '../../store';

import { observer } from 'mobx-react';

import Navigation from '../layout/Navbar';
import ProfileHeader from '../ProfileHeader';
import SuggestedUsers from '../explore/SuggestedUsers';
import PostList from '../explore/PostList';
import Footer from '../layout/Footer';

import { Container, Row, Col } from 'react-bootstrap';

import classNames from 'classnames';

let SingleUser = props => {

    // Define Container Ref
    let containerRef = useRef();

    // Define User
    let user = appStore.auth.user;

    useEffect(() => {

        appStore.fetchUsers();

        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            containerRef.current.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            containerRef.current.style.background = "#E9ECEF";
        }
    }, [user]);

    const activeUser = appStore.users ? appStore.users.filter(user => user._id === props.match.params.id)[0] : null;

    const postsCount = activeUser && appStore.posts ? appStore.posts.filter(post => post.postedBy.id === props.match.params.id).length : 0;

    const condition = user.preferredTheme === 'Dark';

    return (
        <div ref={containerRef}>
            <Navigation />
            <ProfileHeader activeUser={activeUser} />
            <Container className="mt-5">
                <Row>
                    <Col md={8}>
                        <h1 className={classNames("display-4", "mb-4", { 'text-light': condition })}>
                            {activeUser ? `${activeUser.firstname}'s Posts (${postsCount} posts)` : 'Loading'}
                        </h1>
                        <PostList userId={props.match.params.id} />
                    </Col>
                    <Col md={4}>
                        <SuggestedUsers />
                    </Col>
                </Row>
            </Container>
            <Footer type="large" />
        </div>
    )
}

SingleUser = observer(SingleUser);

export default SingleUser;
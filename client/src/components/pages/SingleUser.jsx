import React, { useEffect, useRef } from 'react';

// Import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import Page Components
import Navigation from '../layout/Navbar';
import ProfileHeader from '../ProfileHeader';
import SuggestedUsers from '../explore/SuggestedUsers';
import PostList from '../explore/PostList';
import Footer from '../layout/Footer';

// Import bootstrap components
import { Container, Row, Col } from 'react-bootstrap';

// Import Helmet
import classNames from 'classnames';

// Import Helemet
import { Helmet } from 'react-helmet';

const SingleUser = props => {

    // Define Container Ref
    let containerRef = useRef();

    // Define User
    let user = appStore.auth.user;

    useEffect(() => {

        // Fetch Users
        appStore.fetchUsers();

        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            containerRef.current.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            containerRef.current.style.background = "#E9ECEF";
        }
    }, [user]);

    // Define Active User
    const activeUser = appStore.users ? appStore.users.filter(user => user._id === props.match.params.id)[0] : null;

    // Define postsCount (Amount of posts the user has)
    const postsCount = activeUser && appStore.posts ? appStore.posts.filter(post => post.postedBy.id === props.match.params.id).length : 0;

    // Define Dark Theme Condition
    const condition = user.preferredTheme === 'Dark';

    return (
        <div ref={containerRef} style={{ minHeight: '100vh' }}>
            <Helmet>
                <title>DevNetwork - {activeUser ? `${activeUser.firstname} ${activeUser.lastname}` : 'Loading'}</title>
            </Helmet>
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
            {postsCount < 2 ? <Footer type="small" /> : <Footer type="large" />}
        </div>
    )
}

export default observer(SingleUser);
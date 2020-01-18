import React, { useEffect } from 'react';

import appStore from '../../store';

import { observer } from 'mobx-react';

import { Spinner } from 'react-bootstrap';

import Post from './Post';

let PostList = props => {

    useEffect(() => {
        appStore.fetchPosts();
    }, []);

    let userId = props.userId || false;

    const posts = !userId && appStore.posts ? appStore.posts : appStore.posts ? appStore.posts.filter(post => post.postedBy.id === userId) : [];

    return (
        <React.Fragment>
            {posts ? posts.map(post => {
                return (
                    <Post post={post} key={post._id} />
                )
            }) : <Spinner animation="border" variant="danger" className="mx-5 my-4" />}
        </React.Fragment>
    )
}

PostList = observer(PostList);

export default PostList

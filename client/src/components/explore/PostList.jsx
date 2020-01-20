import React, { useEffect } from 'react';

// Import appstore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

// Import Spinner from react bootstrap
import { Spinner } from 'react-bootstrap';

// Import Post Component
import Post from './Post';

const PostList = props => {

    // Fetch Posts 
    useEffect(() => {
        appStore.fetchPosts();
    }, []);

    // Define user id from props (used if rendering this component in user page not explore page)
    let userId = props.userId || false;

    // Define Posts
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

export default observer(PostList);
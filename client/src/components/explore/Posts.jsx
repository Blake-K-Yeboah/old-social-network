import React from 'react'

import PostList from './PostList';

const Posts = () => {
    return (
        <React.Fragment>
            <h1 className="display-4 pl-1 mb-4">Latest Posts</h1>
            <PostList />
        </React.Fragment>
    )
}

export default Posts;

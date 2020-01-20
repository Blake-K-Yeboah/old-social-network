import React from 'react'

// Import Post List Component
import PostList from './PostList';

// Import classnames
import classNames from 'classnames';

// Import appStore
import appStore from '../../store';

// Import observer
import { observer } from 'mobx-react';

const Posts = () => {

    // Define Dark Condition
    const condition = appStore.auth.user.preferredTheme === 'Dark';

    return (
        <React.Fragment>
            <h1 className={classNames('display-4', 'pl-1', 'mb-4', { 'text-light': condition })}>Latest Posts</h1>
            <PostList />
        </React.Fragment>
    )
}

export default observer(Posts);

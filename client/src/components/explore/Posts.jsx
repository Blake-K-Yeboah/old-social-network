import React from 'react'

import PostList from './PostList';

import classNames from 'classnames';

import appStore from '../../store';

import { observer } from 'mobx-react';

const Posts = () => {
    
    const condition = appStore.auth.user.preferredTheme === 'Dark';

    return (
        <React.Fragment>
            <h1 className={classNames('display-4', 'pl-1', 'mb-4', { 'text-light': condition })}>Latest Posts</h1>
            <PostList />
        </React.Fragment>
    )
}

export default observer(Posts);

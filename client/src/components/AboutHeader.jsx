import React, { useEffect } from 'react'

// Import React-Bootstrap components
import { Jumbotron } from 'react-bootstrap';

// Import Store
import appStore from '../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

// Import classnames
import classNames from 'classnames';

let AboutHeader = () => {

    // Define User
    let user = appStore.auth.user;

    // If The User has dark theme selected change body color
    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'dark') {
            document.body.style.background = "#343A40";
        } else {
            document.body.style.background = "#E9ECEF";
        }
    }, [user]);

    // Set Theme class (dark or light) based on user
    const themeClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'dark' ? 'text-light' : '';

    // Set Bg Class (dark or light) based on user
    const bgClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'dark' ? 'bg-dark' : '';

    return (
        <Jumbotron className={bgClass}>
            <h1 className={classNames("text-center", "display-4", themeClass)}>About DevNetwork!</h1>
            <p className={classNames("text-center", "lead", "my-4", themeClass)}>
                DevNetwork is a social network for developers where you can post your projects and interact with a community full of people with similar interests.
             </p>
        </Jumbotron>

    )
}

export default observer(AboutHeader)
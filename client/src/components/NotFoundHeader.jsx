import React, { useEffect } from 'react'

// Import appStore
import appStore from '../store';

// Import observer
import { observer } from 'mobx-react';

// Import React-Bootstrap jumbotron
import { Jumbotron } from 'react-bootstrap';

// Import NavLink from react router dom
import { NavLink } from 'react-router-dom';

// Import classNames
import classNames from 'classnames';

const NotFoundHeader = () => {
    // Define User
    let user = appStore.auth.user;

    // If The User has dark theme selected change body color
    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            document.body.style.background = "#343A40";
        } else {
            document.body.style.background = "#E9ECEF";
        }
    }, [user]);

    // Set Theme class (dark or light) based on user
    const themeClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'Dark' ? 'text-light' : '';

    // Set Bg Class (dark or light) based on user
    const bgClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'Dark' ? 'bg-dark' : '';

    return (
        <Jumbotron className={bgClass}>
            <h1 className={classNames("text-center", "display-4", "my-5", themeClass)}>404 - Page Not Found</h1>
            <p className="lead text-center">
                <NavLink to="/" className="text-danger">Redirect to Home</NavLink>
            </p>
        </Jumbotron>
    )
}

export default observer(NotFoundHeader);

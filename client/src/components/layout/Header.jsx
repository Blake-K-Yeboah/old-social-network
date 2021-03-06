import React, { useEffect } from 'react'

// Import React-Bootstrap components
import { Jumbotron, Button } from 'react-bootstrap';

// Import Store
import appStore from '../../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

// Import classnames
import classNames from 'classnames';

// Import Icon
import { FaUserPlus } from 'react-icons/fa';

const Header = () => {

    // Define User
    let user = appStore.auth.user;

    // Change Background based on user's theme
    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            document.body.style.background = "#343A40";
        } else {
            document.body.style.background = "#E9ECEF";
        }
    }, [user]);

    // Open Modal Function
    const openModal = () => {
        appStore.openSignUpModal();
    }

    // Define Class Based on theme
    const themeClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'Dark' ? 'text-light' : '';

    // Define background class based on theme
    const bgClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'Dark' ? 'bg-dark' : '';

    return (
        <Jumbotron className={bgClass} style={{ transition: ".6s ease-in-out" }}>
            <h1 className={classNames("text-center", "display-4", themeClass)}>Welcome to DevNetwork!</h1>
            <p className={classNames("text-center", "lead", "my-4", themeClass)}>
                DevNetwork is a social network for developers where you can post your projects and interact with a community full of people with similar interests.
             </p>
            <p className="text-center">
                {appStore.auth.isAuthenticated ? <Button variant="danger" size="lg" disabled>Sign Up <FaUserPlus style={{ marginLeft: '5px' }} /></Button>
                    : <Button variant="danger" size="lg" onClick={openModal}>Sign Up <FaUserPlus style={{ marginLeft: '5px' }} /></Button>}
            </p>
        </Jumbotron>

    )
}

export default observer(Header);

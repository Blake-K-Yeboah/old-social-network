import React, { useEffect } from 'react'

// Import React-Bootstrap components
import { Jumbotron, Button } from 'react-bootstrap';

// Import Store
import appStore from '../../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

// Import classnames
import classNames from 'classnames';

let Header = () => {

    let user = appStore.auth.user;

    useEffect(() => {
        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'dark') {
            document.body.style.background = "#343A40";
        } else {
            document.body.style.background = "#E9ECEF";
        }
    }, [user]);

    const openModal = () => {
        appStore.openSignUpModal();
    }

    const themeClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'dark' ? 'text-light' : '';

    const bgClass = appStore.auth.user && JSON.parse(JSON.stringify(appStore.auth.user)).preferredTheme === 'dark' ? 'bg-dark' : '';

    return (
        <Jumbotron className={bgClass} style={{ transition: ".6s ease-in-out" }}>
            <h1 className={classNames("text-center", "display-4", themeClass)}>Welcome to DevNetwork!</h1>
            <p className={classNames("text-center", "lead", "my-4", themeClass)}>
                DevNetwork is a social network for developers where you can post your projects and interact with a community full of people with similar interests.
             </p>
            <p className="text-center">
                {appStore.auth.isAuthenticated ? <Button variant="danger" size="lg" disabled>Sign Up</Button>
                    : <Button variant="danger" size="lg" onClick={openModal}>Sign Up</Button>}
            </p>
        </Jumbotron>

    )
}

Header = observer(Header);

export default Header

import React from 'react'

// Import React-bootstrap components
import { Navbar, Nav, Button } from 'react-bootstrap';

// Import classnames
import classNames from 'classnames';

// Import NavLink and Redirect from react-router
import { NavLink } from 'react-router-dom';

// Import Login Form
import Login from '../auth/Login';

// Import Observer from mobx-react
import { observer } from 'mobx-react';

// Import AppStore
import appStore from '../../store';

// Import Axios
import axios from 'axios';

import { IoIosCode } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';

let Navigation = () => {

    const logOutHandler = () => {
        // Remove token from local storage
        localStorage.removeItem("jwtToken");

        // Remove auth header for future requests
        delete axios.defaults.headers.common["Authorization"];

        // Set current user to empty object {} which will set isAuthenticated to false
        appStore.setCurrentUser(null)

        appStore.setUserInput({});

        window.location.reload();
    }

    const logOutContent = appStore.auth.isAuthenticated ? (
        <div>
            <span className="text-light mr-3">

                Logged in as <NavLink className="text-light" to={`/user/${appStore.auth.user.id}`}><u>{appStore.auth.user.firstname}</u></NavLink>

            </span>

            <Button variant={`outline-${appStore.auth.user.preferredTheme.toLowerCase()}`} onClick={logOutHandler}>Logout <GoSignOut style={{marginLeft: '5px'}} /></Button>

        </div>
    ) : null;

    return (

        <Navbar bg="danger" expand="lg" variant="dark" className="py-3 px-4" style={{ zIndex: '1' }}>
            <Navbar.Brand href="#home"><IoIosCode style={{marginTop: '-3.5px'}} /> DevNetwork</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <div className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink className={classNames('nav-link', { disabled: !appStore.auth.isAuthenticated, active: appStore.auth.isAuthenticated })} to="/explore">Explore</NavLink>
                    </div>
                    <div className="nav-item active">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </div>
                </Nav>
                {appStore.auth.isAuthenticated ? logOutContent : <Login />}
            </Navbar.Collapse>
        </Navbar>

    )
}

Navigation = observer(Navigation);

export default Navigation;

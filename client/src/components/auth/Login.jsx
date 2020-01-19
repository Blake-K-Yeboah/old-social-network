import React from 'react'

// Import React-BOotstrap Components
import { Form, FormControl, Button } from 'react-bootstrap';

// Import appStore
import appStore from '../../store';

// Import observer from mobx-react
import { observer } from 'mobx-react';

// import jwt_decode
import jwt_decode from 'jwt-decode';

// Import axios 
import axios from 'axios';

import { GoSignIn } from 'react-icons/go';

let Login = () => {

    const loginHandler = () => {
        axios
            .post("/api/users/login", appStore.userInput)
            .then(res => {
                // Set token to localStorage
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);

                // Set token to Auth header
                if (token) {
                    // Apply authorization token to every request if logged in
                    axios.defaults.headers.common["Authorization"] = token;
                } else {
                    // Delete auth header
                    delete axios.defaults.headers.common["Authorization"];
                }

                // Decode token to get user data
                const decoded = jwt_decode(token);

                // Set current user
                appStore.setCurrentUser(decoded);

            })
            .catch(err => {
                alert(Object.values(err.response.data)[0])
            })
    }

    const changeHandler = e => {

        let userInput = appStore.userInput;

        userInput[e.target.id] = e.target.value;

        appStore.setUserInput(userInput);
    }

    return (
        <Form inline>
            <FormControl type="email" placeholder="Email" id="email" className="mr-sm-2" defaultValue={appStore.userInput.email} onChange={changeHandler}/>
            <FormControl type="password" placeholder="Password" id="password" className="mr-sm-2" defaultValue={appStore.userInput.password}  onChange={changeHandler}/>
            <Button variant="outline-light" onClick={loginHandler}>Login <GoSignIn style={{marginLeft: '5px'}}/></Button>
        </Form>
    )
}

Login = observer(Login);

export default Login

// Import Mobx Stuff
import { decorate, observable, action } from 'mobx';

// Import JWT decode to decode jwt token
import jwt_decode from 'jwt-decode';

// Import Axios to make https requests
import axios from 'axios';

// Define Store Class
class Store {

    // Stores Authentication related fields
    auth = {
        isAuthenticated: localStorage.getItem("jwtToken") ? true : false,
        user: localStorage.getItem('jwtToken') ? jwt_decode(localStorage.getItem('jwtToken')) : null,
        error: false
    }

    // Action to set an auth error
    setError = (error) => {
        appStore.auth.error = error;
    }

    // Sign Up Form User Input
    userInput = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    }

    // Action to set Sign Up Form User Input
    setUserInput = (userInput) => {
        appStore.userInput = userInput;
    }

    // Sign Up Modal Viewing Status (false means hidden)
    signUpModalStatus = false

    // Action to close sign up modal
    closeSignUpModal = () => {
        appStore.signUpModalStatus = false;
    }

    // Action to open sign up modal
    openSignUpModal = () => {
        appStore.signUpModalStatus = true;
    }

    // Action to set the current user
    setCurrentUser = (user) => {
        appStore.auth.user = user;

        if (!user) {
            appStore.auth.isAuthenticated = false;
        } else {
            appStore.auth.isAuthenticated = true;
        }
    }

    // Action to update the current user
    updateActiveUser = () => {
        axios.get(`/api/users/${appStore.auth.user.id}`).then(res => {
            let newUser = { ...res.data, _id: undefined, id: appStore.auth.user.id };
            appStore.setCurrentUser(newUser);
        }).catch(err => console.error(err));
    }

    // Array of users
    users = null

    // Action to fetch users from db
    fetchUsers = async () => {
        await axios.get('/api/users').then(res => {
            appStore.users = res.data;
        }).catch(err => {
            console.log(err);
        })
    }

    // Array of posts
    posts = null;

    fetchPosts = async () => {
        await axios.get('/api/posts').then(res => {
            appStore.posts = res.data;
        }).catch(err => {
            console.log(err);
        })
    }
}

// Initiate a store called appStore
const appStore = new Store();

// Decorate store properties with either action or obervable
decorate(appStore, {
    auth: observable,
    setError: action,
    userInput: observable,
    setUserInput: action,
    signUpModalStatus: observable,
    closeSignUpModal: action,
    openSignUpModal: action,
    setCurrentUser: action,
    updateActiveUser: action,
    users: observable,
    fetchUsers: action,
    posts: observable,
    fetchPosts: action
});

// Export appStore
export default appStore;
import React, { useEffect, useRef } from 'react'

// Import appStore
import appStore from '../../store';

// Improt observer
import { observer } from 'mobx-react';

// Improt Page Components
import ProfileHeader from '../ProfileHeader';
import Navigation from '../layout/Navbar';
import EditMenu from '../EditMenu';
import UploadProfilePic from '../UploadProfilePic';
import UploadHeaderImg from '../UploadHeaderImg';
import GoBackBtn from '../GoBackBtn';
import Footer from '../layout/Footer';

// Import Helmet
import { Helmet } from 'react-helmet';

const UserEdit = props => {

    // Define Contianer Ref
    let containerRef = useRef();

    // Define User
    let user = appStore.auth.user;

    useEffect(() => {
        // Fetch Users
        appStore.fetchUsers();

        if (user && JSON.parse(JSON.stringify(user)).preferredTheme === 'Dark') {
            // Change Container Background to dark grey
            containerRef.current.style.background = "#212121";
        } else {
            // Change Container Background to light grey
            containerRef.current.style.background = "#E9ECEF";
        }
    }, [user]);

    // Define Active User
    const activeUser = appStore.users ? appStore.users.filter(user => user._id === props.match.params.id)[0] : null;

    return (
        <div ref={containerRef}>
            <Helmet>
                <title>DevNetwork - Editing User: {activeUser ? activeUser.firstname : 'Loading'}</title>
            </Helmet>
            <Navigation />
            <ProfileHeader noedit={true} activeUser={activeUser} />
            <EditMenu />
            <UploadProfilePic />
            <UploadHeaderImg />
            <GoBackBtn id={props.match.params.id} />
            <Footer type="large" />
        </div>
    )
}

export default observer(UserEdit);
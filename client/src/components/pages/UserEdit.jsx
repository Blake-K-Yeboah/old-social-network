import React, { useEffect } from 'react'

import appStore from '../../store';

import { observer } from 'mobx-react';

import ProfileHeader from '../ProfileHeader';
import Navigation from '../layout/Navbar';
import EditMenu from '../EditMenu';
import UploadProfilePic from '../UploadProfilePic';
import Footer from '../layout/Footer';

let UserEdit = props => {

    useEffect(() => {
        appStore.fetchUsers();
    }, [])
    const activeUser = appStore.users ? appStore.users.filter(user => user._id === props.match.params.id)[0] : null;

    return (
        <React.Fragment>
            <Navigation />
            <ProfileHeader noedit={true} activeUser={activeUser} />
            <EditMenu />
            <UploadProfilePic />
            <Footer type="large" />
        </React.Fragment>
    )
}

UserEdit = observer(UserEdit);

export default UserEdit

// Import React
import React from 'react'

// Import Bootstrap Components
import { Media, Card, Container, Spinner, ButtonGroup, Button, Row, Col } from 'react-bootstrap';

// Import NavLink from React Router
import { NavLink } from 'react-router-dom'

// Import appStore
import appStore from '../store';

// Import Observer from Mobx-React
import { observer } from 'mobx-react';

// Import Prop Types
import PropTypes from 'prop-types';

let ProfileHeader = props => {

    // Define User
    const user = props.activeUser;

    // Header Image Style
    const headerImgStyle = {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        objectPosition: '50% 50%',
        opacity: '1'
    }

    // Profile Image Style
    const profileIconStyle = {
        width: '150px',
        marginTop: '-75px',
        zIndex: '1'
    }

    // Portfolio Button 
    const portfolioBtn = user && user.portfolio ? <a href={!user.portfolio.startsWith('https://') ? `https://${user.portfolio}` : user.portfolio} className="text-dark ml-2">
        <Button variant="danger">Portfolio</Button>
    </a>
        : <Button variant="danger" className="ml-2" disabled>Portfolio</Button>

    // Github Button
    const githubBtn = user && user.github ? (<a href={!user.github.startsWith('https://') ? `https://${user.github}` : user.github} className="text-dark">
        <Button variant="danger">Github</Button>
    </a>)
        : (<Button variant="danger" disabled>Github</Button>);

    // Edit Profile Button
    const editProfile = appStore.auth.isAuthenticated && user &&
        user._id === appStore.auth.user.id ? <NavLink to={`/user/edit/${appStore.auth.user.id}`}><Button variant={props.noedit ? 'secondary' : 'danger'} className="ml-2">Edit Profile</Button></NavLink> : null;

    return (
        <React.Fragment>
            {user ? (<Card>
                <Card.Img variant="top" src={`/uploads/header/${user.headerImg}`} style={headerImgStyle} />
                <Card.Body>
                    <Container>
                        <Media className="float-left">
                            <img src={`/uploads/profile/${user.profileIcon}`} style={profileIconStyle} alt="Profile Icon" className="mr-3 border border-light rounded-circle" />
                            <Media.Body>
                                <h5 className="mt-0">{user.firstname} {user.lastname}</h5>
                                {user.bio ? user.bio : 'No Bio'}
                            </Media.Body>
                        </Media>
                        <Row className="justify-content-end">
                            <Col md={editProfile ? 5 : 4}>
                                <ButtonGroup>
                                    {githubBtn}
                                    {portfolioBtn}
                                    {editProfile}
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>) : <div className="text-center"><Spinner animation="border" variant="danger" style={{ marginTop: "45vh" }} /></div>}
        </React.Fragment>
    )
}

// Set Prop Types
ProfileHeader.propTypes = {
    noedit: PropTypes.bool,
    activeUser: PropTypes.oneOfType([
        PropTypes.oneOf([null]).isRequired,
        PropTypes.object.isRequired
    ]).isRequired
}

// Export Component as observer
export default observer(ProfileHeader);
import React, { useState, useRef } from 'react';

import { Row, Col, Card, Badge, OverlayTrigger, Popover } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import axios from 'axios';

import appStore from '../../store';

import { observer } from 'mobx-react';

const Post = ({ post }) => {

    // Define LoggedIn User Id
    const uid = appStore.auth.user.id;

    // Define Liked Status
    const [liked, setLiked] = useState(post.likes.includes(uid));

    // Define Disliked Status
    const [disliked, setDisliked] = useState(post.dislikes.includes(uid));

    // Calculate Time ago (e.g 5 seconds ago, 2 hours ago, etc)
    const time_ago = (time) => {

        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) time = time.getTime();
                break;
            default:
                time = +new Date();
        }

        let time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        let seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

        if (seconds === 0) {
            return 'Just now'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        let i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] === 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }

    const timeRef = useRef();


    if (window.location.pathname === '/explore') {
        const setTime = () => {
            setInterval(() => {
                let content = time_ago(post.postedOn);
                timeRef.current.textContent = content;
            }, 1000);
        }

        setTime();
    }

    const likeProject = () => {
        if (liked) {
            alert('Youve Already Liked this post');
        } else {

            // Define Body
            const body = { uid };

            // Make Post Request to api
            axios.post(`/api/posts/${post._id}/like`, body, { 'Content-type': 'application/json' }).then(res => console.log(res)).catch(err => console.log(err));

            // Set Liked State to True
            setLiked(true);

            // Fetch Posts Again To Refresh like amount
            appStore.fetchPosts();
        }
    }

    const dislikeProject = () => {
        if (disliked) {
            alert('Youve Already Disliked this post');
        } else {

            // Define Body
            const body = { uid };

            // Make Post Request to api
            axios.post(`/api/posts/${post._id}/dislike`, body, { 'Content-type': 'application/json' }).then(res => console.log(res)).catch(err => console.log(err));

            // Set disliked State to True
            setDisliked(true);

            // Fetch Posts Again To Refresh dislike amount
            appStore.fetchPosts();
        }
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h4">Edit Project</Popover.Title>
            <Popover.Content>
                Click <NavLink to={`/project/edit/${post._id}`} className="text-danger">here</NavLink> to edit this project.
            </Popover.Content>
        </Popover>
    );

    const edit = (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <span className="float-right text-dark" style={{ cursor: 'pointer' }}>&#8942;</span>
        </OverlayTrigger>
    )

    return (
        <Row className="my-4">
            <Col md={12}>
                <Card className="mb-3">
                    <Row className="no-gutters">
                        <Col md={6}>
                            <img src={`/uploads/projects/${post.img}`} className="card-img" alt={`${post.title} Screenshot`} style={{ height: '100%' }} />
                        </Col>
                        <Col md={6}>
                            <Card.Body>
                                {post.postedBy.id === appStore.auth.user.id ? edit : ''}
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text className="text-truncate">{post.description}</Card.Text>
                                {post.github ? <Card.Link className="text-dark" href={post.github}>View Code</Card.Link> : <span className="text-muted">View Code</span>}

                                <NavLink className="text-dark ml-4" to={`/project/${post._id}`}>View Project</NavLink>
                                <hr className="my-2" />
                                <span className="text-success mr-2" style={{ cursor: 'pointer' }} onClick={likeProject}>{liked ? 'Liked' : 'Like'}</span>
                                <Badge variant="success">{post.likes.length}</Badge>

                                <span className="text-danger mx-2" style={{ cursor: 'pointer' }} onClick={dislikeProject}>{disliked ? 'Disliked' : 'Dislike'}</span>
                                <Badge variant="danger">{post.dislikes.length}</Badge>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                Posted <span ref={timeRef}>{time_ago(post.postedOn)}</span> by <NavLink className="text-danger" to={`/user/${post.postedBy.id}`}>{post.postedBy.name}</NavLink>
                            </Card.Footer>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default observer(Post);
import React, { useState } from 'react'

import { Card, Badge } from 'react-bootstrap';

import axios from 'axios';

import appStore from '../store';

import { observer } from 'mobx-react';

import { NavLink } from 'react-router-dom';

const Project = props => {

    const { project } = props;

    // Define LoggedIn User Id
    const uid = appStore.auth.user.id;

    // Define Liked Status
    const [liked, setLiked] = useState(project.likes.includes(uid));

    // Define Disliked Status
    const [disliked, setDisliked] = useState(project.dislikes.includes(uid));

    const likeProject = () => {
        if (liked) {
            alert('Youve Already Liked this project');
        } else {

            // Define Body
            const body = { uid };

            // Make Post Request to api
            axios.post(`/api/posts/${project._id}/like`, body, { 'Content-type': 'application/json' }).then(res => console.log(res)).catch(err => console.log(err));

            // Set Liked State to True
            setLiked(true);

            // Fetch Posts Again To Refresh like amount
            appStore.fetchPosts();
        }
    }

    const dislikeProject = () => {
        if (disliked) {
            alert('Youve Already Disliked this project');
        } else {

            // Define Body
            const body = { uid };

            // Make Post Request to api
            axios.post(`/api/posts/${project._id}/dislike`, body, { 'Content-type': 'application/json' }).then(res => console.log(res)).catch(err => console.log(err));

            // Set disliked State to True
            setDisliked(true);

            // Fetch Posts Again To Refresh dislike amount
            appStore.fetchPosts();
        }
    }

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

    return (
        <Card>
            <Card.Img variant="top" src={`/uploads/projects/${project.img}`} />
            <Card.Body>
                <Card.Title className="display-4 mb-4 mt-2">{project.title}</Card.Title>
                <Card.Text className="lead">
                    {project.description}
                </Card.Text>
                <p className="lead">
                    <span className="font-weight-normal">Github:</span> {project.github ? <a href={project.github} className="text-danger">Link</a> : <span className="text-muted">No Github</span>}
                </p>
                <p className="lead">
                    <span className="font-weight-normal">Preview:</span> {project.preview ? <a href={project.preview} className="text-danger">Link</a> : <span className="text-muted">No Preview</span>}
                </p>
                <p className="lead">
                    <span className="font-weight-normal">Tags:</span> {project.tags ? <span>{project.tags}</span> : <span className="text-muted">No Tags</span>}
                </p>
                <hr className="my-4" />
                <span className="text-success mr-2" style={{ cursor: 'pointer' }} onClick={likeProject}>{liked ? 'Liked' : 'Like'}</span>
                <Badge variant="success">{project.likes.length}</Badge>

                <span className="text-danger mx-2" style={{ cursor: 'pointer' }} onClick={dislikeProject}>{disliked ? 'Disliked' : 'Dislike'}</span>
                <Badge variant="danger">{project.dislikes.length}</Badge>
            </Card.Body>
            <Card.Footer>
                <p className="text-muted text-center mt-2">This Project was posted {time_ago(project.postedOn)} by <NavLink to={`/user/${project.postedBy.id}`} className="text-danger">{project.postedBy.name}</NavLink></p>
            </Card.Footer>
        </Card>
    )
}

export default observer(Project);

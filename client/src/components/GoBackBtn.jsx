import React from 'react';

// Import Navlink from react router dom
import { NavLink } from 'react-router-dom';

// Import Button From React Bootstrap
import { Button } from 'react-bootstrap';

const GoBackBtn = props => {
    return (
        <div className="mt-3 mb-5 text-center">
            <NavLink to={`/user/${props.id}`}>
                <Button variant="danger">Go Back</Button>
            </NavLink>
        </div>
    )
}

export default GoBackBtn;
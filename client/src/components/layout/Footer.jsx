import React from 'react'

// Import Prop Types
import PropTypes from 'prop-types';

const Footer = ({ type }) => {

    // Define Footer Text
    const footerText = (
        <div className="footer-copyright text-center text-light">© 2020 Dev Network</div>
    )

    // Small footer for pages smaller than 100vh
    const smallFooter = (
        <div className="page-footer font-small bg-danger fixed-bottom py-3">
            {footerText}
        </div>
    )

    // Large footer for pages larger than 100vh (doesnt stick to bottom like small footer)
    const largeFooter = (
        <div className="page-footer font-small bg-danger py-3">
            {footerText}
        </div>
    )
    return (
        <div>
            {type === 'small' ? smallFooter : largeFooter}
        </div>
    )
}

// Define Prop types
Footer.propTypes = {
    type: PropTypes.string
}

// Export Footer
export default Footer

import React from 'react'

const Footer = ({ type }) => {

    const smallFooter = (
        <div className="page-footer font-small bg-danger fixed-bottom py-3">
            <div className="footer-copyright text-center text-light">© 2020 Dev Network</div>
        </div>
    )

    const largeFooter = (
        <div className="page-footer font-small bg-danger py-3">
            <div className="footer-copyright text-center text-light">© 2020 Dev Network</div>
        </div>
    )
    return (
        <div>
            {type === 'small' ? smallFooter : largeFooter}
        </div>
    )
}

export default Footer

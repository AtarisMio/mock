import { themr } from 'react-css-themr';

import { Link as MaterialDesignLink } from 'react-toolbox/lib/link/Link';
import theme from 'react-toolbox/lib/link/theme.css';
import { LINK } from 'react-toolbox/lib/identifiers';

import React from 'react';
import PropTypes from 'prop-types';
import goTo from '../../utils/to';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/* eslint-disable */
const Link = (
    { to, href, children, onClick, ...others }
) => {

    const handleClick = (event) => {
        if (onClick) {
            onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();
        goTo(to || href);
    };

    return (
        <MaterialDesignLink {...others} onClick={handleClick}>
            {children}
        </MaterialDesignLink>
    );
};

Link.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

/* eslint-enable */

Link.defaultProps = {
    to: '',
    href: '',
    onClick: null,
};

const ThemedLink = themr(LINK, theme)(Link);

export { ThemedLink as Link, theme as link };

export default ThemedLink;



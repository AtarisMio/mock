import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Link as MaterialDesignLink } from 'react-toolbox/lib/link/Link';
import theme from 'react-toolbox/lib/link/theme.css';
import { LINK } from 'react-toolbox/lib/identifiers';

import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/* eslint-disable */
const Link = (
    { to, children, onClick, ...others }
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
        history.push(this.props.to);
    };

    return (
        <MaterialDesignLink href={to} {...others} onClick={handleClick}>
            {children}
        </MaterialDesignLink>
    );
};

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

/* eslint-enable */

Link.defaultProps = {
    onClick: null,
};

const ThemedLink = withStyles(theme)(themr(LINK, theme)(Link));

export { Link as RawLink, ThemedLink as Link };

export default ThemedLink;



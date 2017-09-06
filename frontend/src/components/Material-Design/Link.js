import withStyles from 'isomorphic-style-loader/lib/withStyles';

import theme from 'react-toolbox/lib/link/theme.css';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { LINK } from 'react-toolbox/lib/identifiers';
import { FontIcon } from './FontIcon';
import history from '../../history';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/* eslint-disable */
const Link = (
    { active, to, children, onClick, className, count, icon, label, theme, ...others }
) => {
    const _className = classnames(
        theme.link,
        {
            [theme.active]: active,
        },
        className
    );

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
        <a data-react-toolbox="link" className={_className} href={to} {...others} onClick={handleClick}>
            {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
            {label ? <abbr>{label}</abbr> : null}
            {count && parseInt(count, 10) !== 0 ? <small>{count}</small> : null}
            {children}
        </a>
    );
};

Link.propTypes = {
    active: PropTypes.bool,
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    count: PropTypes.number,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    label: PropTypes.string,
    theme: PropTypes.shape({
        active: PropTypes.string,
        icon: PropTypes.string,
        link: PropTypes.string,
    }),
};

/* eslint-enable */

Link.defaultProps = {
    active: false,
    className: '',
    onClick: null,
};

const ThemedLink = withStyles(theme)(themr(LINK, theme)(Link));

export { Link as RawLink, ThemedLink };

export default ThemedLink;



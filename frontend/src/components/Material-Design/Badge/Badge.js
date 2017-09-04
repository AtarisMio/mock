import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './Badge.css';

class Badge extends PureComponent {
    static propTypes = {
        badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]).isRequired,
        noBackground: PropTypes.bool,
        overlap: PropTypes.bool,
        children: PropTypes.element.isRequired,
    };

    static defaultProps = {
        overlap: false,
        noBackground: false
    }

    render() {
        const { children, badge, noBackground, overlap, ...props } = this.props;
        return (
            <div className={cx(noBackground ? s.noBackground : null, overlap ? s.overlap : null, s.badge)} data-badge={badge} {...props}>
                {children}
            </div>
        )
    }

}

export default withStyles(s)(Badge);
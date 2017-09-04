import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import s from './Button.css';

class Button extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['default', 'raised', 'fab', 'mini-fab', 'icon']),
        colored: PropTypes.oneOf([true, false, 'primary', 'accent']),
        ripple: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]).isRequired,
    };

    static defaultProps = {
        type: 'default',
        colored: false,
        ripple: false,
    }

    render() {
        const { children, ...props } = this.props;
        return (
            <div className={}
                {...props}>
                {children}
            </div>
        )
    }

}

export default withStyles(s)(Button);
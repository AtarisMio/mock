import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Ripples from '../Ripples/Ripples';

import s from './Button.css';

class Button extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        type: PropTypes.oneOf(['default', 'raised', 'fab', 'mini-fab', 'icon']),
        colored: PropTypes.oneOf([true, false, 'primary', 'accent']),
        ripple: PropTypes.bool,
        onClick: PropTypes.func,
        onMouseUp: PropTypes.func,
        onMouseLeave: PropTypes.func,
        disabled: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]).isRequired,
    };

    static defaultProps = {
        className: undefined,
        type: 'default',
        colored: false,
        ripple: false,
        onClick: undefined,
        onMouseUp: undefined,
        onMouseLeave: undefined,
        disabled: false,
    }

    componentWillUpdate() {
        if (this.props.ripple && this.ripple) {
            this.ripple.pulsate();
        }
    }

    onMouseUp = (e) => {
        const { onClick } = this.props;
        this.blurHandle(e);
        if (onClick) {
            onClick(e);
        }
        return true;        
    }

    getRipple = (ripple) => {
        this.ripple = ripple;
    }

    rippleHandle = (e) => {
        if (e) {
            if (event.defaultPrevented) {
                return false;
            }
            if (this.props.ripple && this.ripple) {
                this.ripple.start(e);
            }
        }
        return true;        
    }

    blurHandle = (e) => {
        if (e) {
            this.container.blur();
            if (event.defaultPrevented) {
                return false;
            }
            if (this.props.ripple && this.ripple) {
                this.ripple.stop(e);
            }
        }
        return true;
    }

    render() {
        const { className, children, onClick, onMouseUp, onMouseLeave, type, colored, ripple, ...props } = this.props;
        return (
            <button ref={(r) => { this.container = r; }}
                className={cx(
                    className,
                    type === 'mini-fab' ? [s.fab, s['mini-fab']] : null,
                    s[type],
                    colored === true ? s.colored : null,
                    colored ? s[colored] : null,
                    s.button,
                )}
                onMouseDown={this.rippleHandle}
                onTouchStart={this.rippleHandle}
                onTouchEnd={this.blurHandle}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.blurHandle}
                {...props}
            >
                {children}
                {ripple
                    ? <Ripples getRipple={this.getRipple} center={false} classes={{ripple:s.ripple}}/>
                    : null}
            </button>
        )
    }

}

export default withStyles(s)(Button);
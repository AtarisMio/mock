import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import cx from 'classnames';
import PropTypes from 'prop-types';

class Ripple extends PureComponent {

    static propTypes = {
        classes: PropTypes.shape({
            wrapper: PropTypes.string,
            wrapperLeaving: PropTypes.string,
            wrapperPulsating: PropTypes.string,
            ripple: PropTypes.string,
            rippleVisible: PropTypes.string,
            rippleFast: PropTypes.string,
        }).isRequired,
        className: PropTypes.string,
        pulsate: PropTypes.bool,
        rippleSize: PropTypes.number.isRequired,
        rippleX: PropTypes.number.isRequired,
        rippleY: PropTypes.number.isRequired,
    }

    static defaultProps = {
        className: undefined,
        pulsate: false,
    };

    state = {
        rippleVisible: false,
        rippleLeaving: false,
    }

    getRippleStyles = () => {
        const { rippleSize, rippleX, rippleY } = this.props;

        return {
            width: rippleSize,
            height: rippleSize,
            top: -(rippleSize / 2) + rippleY,
            left: -(rippleSize / 2) + rippleX,
        };
    };

    handleEnter = () => {
        this.setState({
            rippleVisible: true,
        });
    };

    handleExit = () => {
        this.setState({
            rippleLeaving: true,
        });
    };

    render() {
        const { classes, className: classNameProp, pulsate, rippleX, rippleY, rippleSize, ...other } = this.props;
        const { rippleVisible, rippleLeaving } = this.state;

        const className = cx(
            classes.wrapper,
            {
                [classes.wrapperLeaving]: rippleLeaving,
                [classes.wrapperPulsating]: pulsate,
            },
            classNameProp,
        );

        const rippleClassName = cx(classes.ripple, {
            [classes.rippleVisible]: rippleVisible,
            [classes.rippleFast]: pulsate,
        });

        return (
            <Transition
                onEnter={this.handleEnter}
                onExit={this.handleExit}
                {...other}
            >
                <span className={className}>
                    <span className={rippleClassName} style={this.getRippleStyles()} />
                </span>
            </Transition>
        )
    }

}

export default Ripple;
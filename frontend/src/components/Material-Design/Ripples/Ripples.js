import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Ripple from './Ripple';
import s from './Ripples.css';

const mergeClass = (classes) => {
    const ret = {
        root: s.root,
        wrapper: s.wrapper,
        wrapperLeaving: s.wrapperLeaving,
        wrapperPulsating: s.wrapperPulsating,
        ripple: s.ripple,
        rippleVisible: s.rippleVisible,
        rippleFast: s.rippleFast,
    };
    Object.keys(classes).map(key => {
        ret[key] = cx(ret[key], classes[key]);
        return key;
    });
    return ret;
}

class Ripples extends PureComponent {

    static propTypes = {
        classes: PropTypes.shape({
            root: PropTypes.string,
            wrapper: PropTypes.string,
            wrapperLeaving: PropTypes.string,
            wrapperPulsating: PropTypes.string,
            ripple: PropTypes.string,
            rippleVisible: PropTypes.string,
            rippleFast: PropTypes.string,
        }),
        getRipple: PropTypes.func.isRequired,
        className: PropTypes.string,
        center: PropTypes.bool
    }

    static defaultProps = {
        classes: {
            root: s.root,
            wrapper: s.wrapper,
            wrapperLeaving: s.wrapperLeaving,
            wrapperPulsating: s.wrapperPulsating,
            ripple: s.ripple,
            rippleVisible: s.rippleVisible,
            rippleFast: s.rippleFast,
        },
        className: undefined,
        center: false
    }

    state = {
        nextKey: 0,
        ripples: [],
    }

    componentDidMount() {
        this.props.getRipple(this);
    }

    ignoringMouseDown = false;

    pulsate = () => {
        this.start({}, { pulsate: true });
    };

    start = (event = {}, options = {}, cb) => {
        const { pulsate = false, center = this.props.center || options.pulsate } = options;

        if (event.type === 'mousedown' && this.ignoringMouseDown) {
            this.ignoringMouseDown = false;
            return;
        }

        if (event.type === 'touchstart') {
            this.ignoringMouseDown = true;
        }

        let ripples = this.state.ripples;

        const element = findDOMNode(this); // eslint-disable-line
        const rect = element
            ? element.getBoundingClientRect()
            : {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            };

        // Get the size of the ripple
        let rippleX;
        let rippleY;
        let rippleSize;

        if (
            center ||
            (event.clientX === 0 && event.clientY === 0) ||
            (!event.clientX && !event.touches)
        ) {
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
            const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }

        if (center) {
            rippleSize = Math.sqrt((2 * (rect.width ** 2) + (rect.height ** 2)) / 3);

            // For some reason the animation is broken on Mobile Chrome if the size if even.
            if (rippleSize % 2 === 0) {
                rippleSize += 1;
            }
        } else {
            const sizeX =
                Math.max(
                    Math.abs((element ? element.clientWidth : 0) - rippleX),
                    rippleX,
                ) * 2 + 2;
            const sizeY =
                Math.max(
                    Math.abs((element ? element.clientHeight : 0) - rippleY),
                    rippleY,
                ) * 2 + 2;
            rippleSize = Math.sqrt((sizeX ** 2) + (sizeY ** 2));
        }

        const { classes } = this.props;
        const c = mergeClass(classes);
        // Add a ripple to the ripples array
        ripples = [
            ...ripples,
            <Ripple
                key={this.state.nextKey}
                classes={c}
                timeout={{
                    exit: 500,
                    enter: 500,
                }}
                pulsate={pulsate}
                rippleX={rippleX}
                rippleY={rippleY}
                rippleSize={rippleSize}
            />,
        ];

        this.setState(
            {
                nextKey: this.state.nextKey + 1,
                ripples,
            },
            cb,
        );
    };

    stop = (event, cb) => {
        const { ripples } = this.state;
        if (ripples && ripples.length) {
            this.setState(
                {
                    ripples: ripples.slice(1),
                },
                cb,
            );
        }
    };

    render() {
        const { classes, center, className, getRipple, ...other } = this.props;
        const c = mergeClass(classes);
        return (
            <TransitionGroup
                component="span"
                enter
                exit
                className={cx(c.root, className)}
                {...other}
            >
                {this.state.ripples}
            </TransitionGroup>
        );
    }

}

export default withStyles(s)(Ripples);
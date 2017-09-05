import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import cancel from './ic_cancel_48px.svg';
import s from './Chip.css';

class Chip extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        contactType: PropTypes.oneOf(['text', 'img']),
        contact: PropTypes.string,
        onClick: PropTypes.func,
        onDelete: PropTypes.func,
        children: PropTypes.element.isRequired,
    };

    static defaultProps = {
        className: undefined,
        contactType: 'text',
        contact: undefined,
        onClick: undefined,
        onDelete: undefined,
    }

    render() {
        const { className, children, contactType, contact, onClick, onDelete, ...props } = this.props;
        return (
            <div
                role='presentation'
                className={
                    cx(className,
                        s.chip,
                        contact && (contactType === 'text' || contactType === 'img') ? s.hasContact : null,
                        onDelete ? s.deletable : null
                    )}
                onClick={this.onClick}
                {...props}
            >
                {contact && contactType === 'text' ? <span className={s.contact}>{contact}</span> : null}
                {contact && contactType === 'img' ? <img className={s.contact} src={contact} alt='contact' /> : null}
                {children}
                {onDelete
                    ? <button type='button' className={s.action} onClick={this.onDelete} >
                        <img src={cancel} alt='delete' />
                    </button>
                    : null}
            </div>
        )
    }

}

export default withStyles(s)(Chip);
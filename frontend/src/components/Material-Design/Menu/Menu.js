import React, { PureComponent } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import s from './Menu.css';
import moreVert from './ic_more_vert_48px.svg';

const defaultMenuButton = (onClick) => <Button type="icon" role="menubar" onClick={onClick}><img src={moreVert} alt="more" /></Button>

class Menu extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        menuButton: PropTypes.element,
    };

    static defaultProps = {
        className: undefined,
        menuButton: undefined,
    }

    state = {
        display: false
    }

    showMenu = () => {
        this.setState({ display: true });
    }

    hideMenu = () => {
        this.setState({ display: false });
    }

    toggleMenu = () => {
        this.setState({ display: !this.state.display });
    }

    render() {
        const { className, children, menuButton, ...props } = this.props;
        const { display } = this.state;
        return (
            <div className={cx(className, s.menu)} {...props}>
                {<menuButton onClick={this.showMenu} /> || defaultMenuButton(this.toggleMenu)}
                <div role='presentation' className={s.closeShade} style={{ display: display ? 'none' : 'block' }} onClick={this.hideMenu} />
                <div role='menu' className={s.menuList} style={{ display: display ? 'block' : 'none' }}>
                    {children}
                </div>
            </div>
        )
    }

}

export default withStyles(s)(Menu);
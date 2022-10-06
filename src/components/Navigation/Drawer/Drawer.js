import React, {Component} from "react";
import classes from "./Drawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        className={({isActive}) => isActive ? classes['active'] : ''}
                        to={link.to}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes['Drawer']];
        if (!this.props.isOpen) {
            cls.push(classes['close']);
        }

        const links = [
            {to: '/', label: 'Список'},
        ];
        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест'});
            links.push({to: '/logout', label: 'Выйти'});
        } else {
            links.push({to: '/auth', label: 'Авторизация'});
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;
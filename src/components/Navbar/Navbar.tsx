import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
// console.log(s);
// let s = {
//     'nav': 'Navbar_nav__3ou9Q',
//     'item': 'Navbar_item__3qaF3',
//     'active' : 'Baksndakdn_actve'
 // }

// let c1 = "item";
// let c2 = "active";
// // "item active"
// let classes = c1 + " " + c2;
// let classesNew = `${s.item} ${c2}`;
//
// console.log(classesNew)

const Navbar = () => {
    const activeLink = `${s.active}`;

    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to='/profile' activeClassName={ activeLink }>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' activeClassName={ activeLink }>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/news' activeClassName={ activeLink }>News</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/music' activeClassName={ activeLink }>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/settings' activeClassName={ activeLink }>Settings</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' activeClassName={ activeLink }>Users</NavLink>
        </div>

    </nav>
}

export default Navbar;
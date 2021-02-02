import React from 'react';
import s from '../Dialogs.module.css'
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FunctionComponent<PropsType> = ({id, name}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${id}`} activeClassName = {s.active}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;


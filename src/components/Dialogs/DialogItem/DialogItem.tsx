import React from 'react';
import s from '../Dialogs.module.css'
import { NavLink } from "react-router-dom";

type Props = {
    id: number
    name: string
}

const DialogItem: React.FC<Props> = ({id, name}) => {
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${id}`} activeClassName = {s.active}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;

import React from 'react';
import s from '../Dialogs.module.css'
import { NavLink } from "react-router-dom";

type DialogItemProps = {
    id: number
    name: string
}

const DialogItem: React.FunctionComponent<DialogItemProps> = ({id, name}) => {
    // let {id, name} = props
    return (
        <div className={s.dialog}>
            <NavLink to={`/dialogs/${id}`} activeClassName = {s.active}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;

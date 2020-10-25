import React from 'react';
import s from '../Dialogs.module.css'

function Message({message}:any) {
    // let {message} = props
    return (
        <div className={s.message}>{message}</div>
    )
}

export default Message;

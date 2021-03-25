import React from 'react';
import s from '../Dialogs.module.css'

type Props = {
    message: string
}
const Message: React.FC<Props> = ({message}) => {
    return (
        <div className={s.message}>{message}</div>
    )
}

export default Message;

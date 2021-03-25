import React, {useEffect, useState} from 'react';
import { ChangeEvent } from 'react';

type Props = {
    status: string
    updateStatus(status: string): void
    isOwner: boolean
}

const ProfileStatusWithHooks: React.FC<Props> = (props) => {
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    }

    return (
        <div><b>Статус:</b>
            {
                !editMode
                    ? <span  onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
                    : <div>
                        <input value = {status} autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusEditHandler} />
                    </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;

import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props: {status: string | number, updateStatus(status: string | number): void }) => {
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusEditHandler = (e: any) => {
        setStatus(e.target.value);
    }

    return (
        <div>
            {
                !editMode
                    ? <span onDoubleClick={activateEditMode}>Статус: <div>{props.status || 'no status'}</div></span>
                    : <div>
                        <input value = {status} autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusEditHandler} />
                    </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;

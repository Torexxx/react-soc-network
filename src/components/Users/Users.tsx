import React from 'react';
import userPhoto from '../../assets/images/avatar.png';
import {IUser} from "../../interfaces";

 interface IUsers {
     followToggle(userId: number): void
     setUsers(users: Array<IUser> ): void
     users: Array<IUser>
 }

const Users: React.FunctionComponent<IUsers> = ({followToggle, setUsers, users}) => {

    if (users.length === 0) {
        fetch('https://social-network.samuraijs.com/api/1.0/users',
            // {mode: 'no-cors', credentials: "omit"}
            )
            .then(response => response.json())
            .then(json => {
                console.log(json.items)
                setUsers(json.items)
            })
    }

    return (
        <div>
            {users.map((user: IUser) => {

                console.log(users)
                return <div key={user.id}>
                    <div>
                        <div><img alt='avatar'
                                  style={{width: '100px'}}
                                  src={user.photos.small ? user.photos.small : userPhoto}/>
                        </div>
                        <div>{user.name}</div>
                    </div>
                    <div>   {user.status}</div>

                   {/*<div>{user.location.city}*/}
                   {/*    {user.location.country}</div>*/}


                    <div style={{marginBottom: '10px'}}><button className={'btn btn-primary'} onClick={() => followToggle(user.id)}>{user.followed ? 'unfollow' : 'follow'}</button></div>
                </div>
            })}
        </div>
    );
};

export default Users;

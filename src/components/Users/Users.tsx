import React, {useEffect} from 'react';
import userPhoto from '../../assets/images/avatar.png';
import {IUser} from "../../interfaces";
import style from './Users.module.css'
import {Preloader} from "../Preloader/Preloader";
import {NavLink} from "react-router-dom";

interface IUsers {
    followToggle(userId: number): void
    setUsers(users: Array<IUser>): void

    users: Array<IUser>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

    setCurrentPage(page: number): void
    setTotalUsersCount(usersCount: number): void
    showLoader(): void
    hideLoader(): void
}

const Users: React.FunctionComponent<IUsers> = ({
    followToggle,
    setUsers,
    users,
    pageSize,
    totalUsersCount,
    currentPage,
    setCurrentPage,
    setTotalUsersCount,
    isFetching,
    showLoader,
    hideLoader,
  }) => {

    useEffect(() => {
        showLoader();
        fetch(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.json())
            .then(json => {
                setUsers(json.items)
                setTotalUsersCount(json.totalCount)
                hideLoader();
            })
            .catch((error) => console.log(error + ' -- включи инет'))
    }, [currentPage])

    // const getUsers = () => {
    //     if (users.length === 0) {
    //         fetch('https://social-network.samuraijs.com/api/1.0/users',
    //             // {mode: 'no-cors', credentials: "omit"}
    //         )
    //             .then(response => response.json())
    //             .then(json => {
    //                 console.log(json.items)
    //                 setUsers(json.items)
    //             })
    //     }
    // }

    let pages = [];
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className={style.users}>
            { isFetching ? <Preloader/>
                    :
                    <>
                        {pages.map(p => <span key={p} onClick={() => onPageChanged(p)}
                                              className={style.currentPage}>{p}</span>)}
                        {users.map((user: IUser) => {
                            return <div key={user.id}>
                                        <div>
                                            <div>
                                                <NavLink to={'/profile/' + user.id}>
                                                    <img alt='avatar'
                                                         style={{width: '100px'}}
                                                         src={user.photos.small ? user.photos.small : userPhoto}/>
                                                </NavLink>
                                            </div>
                                            <div>{user.name}</div>
                                        </div>
                                        <div> {user.status}</div>
                                        <div style={{marginBottom: '10px'}}>
                                            <button className={'btn btn-primary'}
                                                    onClick={() => followToggle(user.id)}>{user.followed ? 'unfollow' : 'follow'}</button>
                                        </div>
                                    </div>
                        })}
                    </>
            }
        </div>
    );
};

export default Users;

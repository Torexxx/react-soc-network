import { createSelector } from 'reselect'
import { IUser } from '../types/types'
import { AppStateType } from './redux-store'
// const { createSelector } = require('reselect');

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users: Array<IUser>) => {
     return users.filter((user: IUser) => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize

}

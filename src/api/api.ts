const mainUrl = 'https://social-network.samuraijs.com/api/1.0/';

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return fetch(`${mainUrl}users?count=${pageSize}&page=${currentPage}`, {
            credentials : "include",
        })
            .then(response => response.json());
    },
    unfollow(userId: number) {
            return fetch(`${mainUrl}follow/${userId}`, {
            method: "DELETE",
            credentials : "include",
            headers: {
                'API-KEY': '440b7389-1318-41a2-a185-f027c1dbbdad'
            }
        })
    },
    follow(userId: number) {
        return fetch(`${mainUrl}follow/${userId}`, {
            method: "POST",
            credentials : "include",
            headers: {
                'API-KEY': '440b7389-1318-41a2-a185-f027c1dbbdad'
            }
        })
    },
    getProfile(userId: number) {
        console.warn('use profileAPI.getProfile()');
        return profileAPI.getProfile(userId);

    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return fetch(`${mainUrl}profile/${userId}`,
            {credentials: 'include'})
            .then(response => response.json())
    },
    updateStatus(status: string) {
        return fetch(`${mainUrl}profile/status`,
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': '440b7389-1318-41a2-a185-f027c1dbbdad'
                },
                credentials: 'include',
                body: JSON.stringify({status})

            })
            .then(response => response.json())
    },
    getStatus(userId: number) {
        return fetch(`${mainUrl}profile/status/${userId}`,
            {credentials: 'include'})
            .then(response => response.json())
    }
}

export const authAPI = {
    me() {
        return fetch(`${mainUrl}auth/me`,
            {credentials: 'include'}
        )
            .then(response => response.json())
    },
    login(email: string, password: any, rememberMe: boolean = false) {
        return fetch(`${mainUrl}auth/login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': '440b7389-1318-41a2-a185-f027c1dbbdad'
                },
                body: JSON.stringify({email, password, rememberMe})
            }
        )
            .then(response => response.json())
    },
    logOut() {

        return fetch(`${mainUrl}auth/login`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': '440b7389-1318-41a2-a185-f027c1dbbdad'
                },
            }
        )
            .then(response => response.json())
    },
}


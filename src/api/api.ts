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
                'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
            }
        })
    },
    follow(userId: number) {
        return fetch(`${mainUrl}follow/${userId}`, {
            method: "POST",
            credentials : "include",
            headers: {
                'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
            }
        })
    },
    getProfile(userId: number) {
        console.warn('use profileAPI.getProfile()');
        return profileAPI.getProfile(userId);

    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append("image", photoFile);

        return fetch(`${mainUrl}/profile/photo`, {
            method: "PUT",
            credentials : "include",
            headers: {
                'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
            },
            body: formData
        })
            .then(response => {
                return response.json()
            })
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
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                },
                credentials: 'include',
                body: JSON.stringify({status})

            })
            .then(response => response.json())
    },
    getStatus(userId: number) {
        return fetch(`${mainUrl}profile/status/${userId}`,
            {credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                }})
            .then(response => response.json())
            .catch(console.log)
    },
    saveProfile(profile: object) {

        return fetch(`${mainUrl}profile`,
            {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                },
                credentials: 'include',
                body: JSON.stringify(profile)

            })
            .then(response => response.json())
    },
}

export const authAPI = {
    me() {
        return fetch(`${mainUrl}auth/me`,
            {credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                }}
        )
            .then(response => response.json())
            .catch(console.log)
    },
    login(email: string, password: any, rememberMe: boolean = false, captcha?: string) {
        return fetch(`${mainUrl}auth/login`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                },
                body: JSON.stringify({email, password, rememberMe, captcha})
            }
        )
            .then(response => response.json())
    },
    logout() {

        return fetch(`${mainUrl}auth/login`,
            {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                },
            }
        )
            .then(response => response.json())
    },
    getCaptcha() {
        return fetch(`${mainUrl}security/get-captcha-url`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'API-KEY': 'd07e318e-5bc8-4780-b44a-37a9fb87fff6'
                },
            }
        )
            .then(response => response.json())
    }

}


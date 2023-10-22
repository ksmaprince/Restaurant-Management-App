import { BASE_URL } from '@env'
export const useUserService = () => {

    const getUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users`);
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }

    const createUser = async (user) => {
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
            const json = await response.json()
            return json
        } catch (error) {
            throw error
        }
    }

    const startLogin = async (credential) => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(credential)
            })
            const json = await response.json()
            return json
        } catch (error) {
            throw error
        }
    }

    const updateProfile = async (token, userId, user) => {
        console.log('UserId', userId)
        console.log('User', user)
        console.log('Token', token)
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    'Authorization': `Barer ${token}`
                },
                body: JSON.stringify(user)
            })
            const json = await response.json()
            return json
        } catch (error) {
            throw error
        }
    }

    const updateProfileImage = async (token, userId, image) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/images`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    'Authorization': `Barer ${token}`
                },
                body: JSON.stringify(image)
            })
            const json = await response.json()
            return json
        } catch (error) {
            throw error
        }
    }

    return { getUsers, createUser, startLogin, updateProfile, updateProfileImage }
}
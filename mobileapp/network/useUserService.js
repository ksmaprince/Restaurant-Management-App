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

    const createCourse = async (departmentId, course) => {
        try {
            const response = await fetch(`${BASE_URL}/departments/${departmentId}/courses`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(course)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const updateCourse = async (departmentId, course) => {
        try {
            const response = await fetch(`${BASE_URL}/departments/${departmentId}/courses/${course._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(course)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const deleteCourse = async (departmentId, courseId) => {
        try {
            const response = await fetch(`${BASE_URL}/departments/${departmentId}/courses/${courseId}`, {
                method: "DELETE"
            })
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }

    const addReview = async (departmentId, courseId, review) => {
        try {
            const response = await fetch(`${BASE_URL}/departments/${departmentId}/courses/${courseId}/reviews`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(review)
            })
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }

    return { getUsers, createUser, startLogin }
}
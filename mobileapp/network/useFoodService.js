import { BASE_URL } from '@env'

export const useUserService = () => {

    const createFood = async (userId, food) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(food)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const updateFood = async (userId, food) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods/${food._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(food)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const deleteFood = async (userId, foodId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods/${foodId}`, {
                method: "DELETE"
            })
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }

    return { createFood, updateFood, deleteFood }
}
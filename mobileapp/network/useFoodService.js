import { BASE_URL } from '@env'

export const useFoodService = () => {

    const createFood = async (userId,userToken, food) => {
        try {
            console.log(food);
            
            const response = await fetch(`${BASE_URL}/users/${userId}/foods`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(food)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const updateFood = async (userId,userToken, food) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods/${food._id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(food)
            })
            const json = await response.json()
            return json;
        } catch (error) {
            throw error;
        }
    }

    const deleteFood = async (userId,userToken, foodId) => {
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
    const getFood = async (userId,userToken) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json', 
                  }
            })
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }
    return { createFood, updateFood, deleteFood, getFood }
}
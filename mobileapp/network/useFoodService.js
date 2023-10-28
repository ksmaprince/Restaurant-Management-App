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

    const updateFood = async (token, userId, food) => {
        try {
            console.log("servicefood",food)
            const response = await fetch(`${BASE_URL}/users/${userId}/foods/${food._id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(food),
            })
            console.log(response)
            const json = await response.json()
            return json;
        } catch (error) {
            console.error("error：" + error);
        }
    }
    

    const deleteFood = async (token, userId, foodId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods/${foodId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
            const json = await response.json();
            return json;
        } catch (error) {
            console.error("error " + error);
        }
    }
    const getFoods = async (token,userId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/foods`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                return data;
            } else {
                return "DB Error";
            }
        } catch (error) {
            console.error("error " + error);
        }
    }
    return { createFood, updateFood, deleteFood, getFoods }
}
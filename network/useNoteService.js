import { BASE_URL } from '@env'
import { useId } from 'react'


export const getUserNotes = async (token, userId) => {
    try {
        console.log(userId);
        const response = await fetch(`${process.env.BASE_URL}/users/${userId}/notes`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            console.log('res', response);
            const data = await response.json();
            console.log('data', data);
            return data;
        } else {
            return "DB Error";
        }
    } catch (error) {
        console.error("error：" + error);
    }
};

export const createNote = async (token, userId, note) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/users/${userId}/notes`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(note),

        })
        const json = await response.json()
        return json;
    } catch (error) {
        console.error("error：" + error);
    }
}

export const updateNote = async (token, userId, note) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/users/${userId}/notes/${note._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(note),
        })
        const json = await response.json()
        return json;
    } catch (error) {
        console.error("error：" + error);
    }
}

export const deleteNote = async (token, userId, noteId) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/users/${userId}/notes/${noteId}`, {
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
        console.error("error：" + error);
    }
}
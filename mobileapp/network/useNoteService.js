import { BASE_URL } from '@env'
import { useId } from 'react'


export const getUserNotes = async (userId) => {
    try {
        console.log(userId);
        const response = await fetch(`${BASE_URL}/users/${userId}/notes`);
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

export const createNote = async (userId, note) => {
    try {
        console.log('aaaaaaaaaaaa', userId)
        const response = await fetch(`${BASE_URL}/users/${userId}/notes`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(note)
        })
        const json = await response.json()
        return json;
    } catch (error) {
        console.error("error：" + error);
    }
}

export const updateNote = async (userId, note) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/notes/${note._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(note)
        })
        const json = await response.json()
        return json;
    } catch (error) {
        console.error("error：" + error);
    }
}

export const deleteNote = async (userId, noteId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/notes/${noteId}`, {
            method: "DELETE"
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("error：" + error);
    }
}
import { BASE_URL } from '@env'
import { useId } from 'react'

export const useUserService = () => {

    const createNote = async (userId, note) => {
        try {
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
            throw error;
        }
    }

    const updateNote = async (userId, note) => {
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
            throw error;
        }
    }

    const deleteNote = async (userId, noteId) => {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/notes/${noteId}`, {
                method: "DELETE"
            })
            const json = await response.json();
            return json;
        } catch (error) {
            throw error;
        }
    }
    return { createNote, updateNote, deleteNote }
}
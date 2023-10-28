import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MEASUREMENT_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const useFirebase = () => {

    const uploadImage = async (userId, file) => {
        try {
            const date = new Date()
            const timeStamp = date.getTime()
            const storageRef = ref(storage, `compro/images/${userId}/${userId}_${timeStamp}`);

            await uploadBytes(storageRef, file)
            const imageUrl = await getDownloadURL(storageRef)
            return { success: true, message: 'Image uploaded.', imageUrl }
        } catch (error) {
            throw error
        }
    }

    return { uploadImage }
}
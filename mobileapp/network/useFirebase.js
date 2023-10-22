import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAp1aDarqQkYbUXYmEXdpaESocDyBuiXKY",
    authDomain: "compro-20594.firebaseapp.com",
    projectId: "compro-20594",
    storageBucket: "compro-20594.appspot.com",
    messagingSenderId: "666379678384",
    appId: "1:666379678384:web:78d0e851351ade7cf3c175",
    measurementId: "G-K3XWHJ9QLP"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const useFirebase = () => {

    const uploadImage = async (userId,file) => {
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
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, get, update, remove } from "firebase/database";

const firebaseConfig = {
        apiKey: "AIzaSyD253AaFVrieaszEK36gFE9TsJmfBok3xs",
        authDomain: "duyenle-website.firebaseapp.com",
        databaseURL: "https://duyenle-website-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "duyenle-website",
        storageBucket: "duyenle-website.appspot.com",
        messagingSenderId: "1027789922765",
        appId: "1:1027789922765:web:54a17f0b8eab7ecc4c2484",
        measurementId: "G-FMZRQXLKQD"
    };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getFirebase = async ( path: any ) =>{
    try {
        const dataRef = dbRef(db, path);
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('Không có dữ liệu, vui lòng check lại nha!');
            return null;
        }
        } catch (error) {
        console.error('Hiện tại đang lỗi:', error);
        throw error;
        }
}

export const setFirebase = async ( path: any, params: Object ) => {
    try {
        const dataRef = dbRef(db, path);
        await set( dataRef, params );
        console.log("Đã thêm vào Firebase thành công!");
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }  
}

export const updateFirebase = async ( path: any, params: Object ) => {
    try {
        const dataRef = dbRef(db, path);
        await update( dataRef, params );
        console.log('Sủa chữa dữ liệu thành công!');
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }   
}

export const removeFirebase = async ( path:any ) => {
    try {
        const dataRef = dbRef(db, path);
        await remove(dataRef);
        console.log("Đã xóa dữ liệu thành công!");  
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }
}
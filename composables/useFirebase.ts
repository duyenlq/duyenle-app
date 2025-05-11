import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, get, update, remove } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL,listAll,deleteObject  } from "firebase/storage"

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
const storage = getStorage(app)

export const getFirebase = async (path: any) => {
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

export const setFirebase = async (path: any, params: Object) => {
    try {
        const dataRef = dbRef(db, path);
        await set(dataRef, params);
        console.log("Đã thêm vào Firebase thành công!");
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }
}

export const updateFirebase = async (path: any, params: Object) => {
    try {
        const dataRef = dbRef(db, path);
        await update(dataRef, params);
        console.log('Sủa chữa dữ liệu thành công!');
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }
}

export const removeFirebase = async (path: any) => {
    try {
        const dataRef = dbRef(db, path);
        await remove(dataRef);
        console.log("Đã xóa dữ liệu thành công!");
    } catch (error) {
        console.error('Error removing data:', error);
        throw error;
    }
}

// Lưu ảnh
export const saveImageFirebase = async ( file: File, folder: string = 'test' ) => {
    if (!file) throw new Error('Chưa chọn file')
        const nameImage = Date.now() + random(1,100) + '_' + file.name
        const fileRef = storageRef(storage, `${folder}/${nameImage}`)
        await uploadBytes(fileRef, file)
        const getUrl = await getDownloadURL(fileRef)    
        return {name: nameImage,url: getUrl}
}

export const saveImageCustomFirebase = async ( file: File, name?: string ,folder: string = 'test' ) => {
    if (!file) throw new Error('Chưa chọn file')
        const nameImage = name? name: file.name
        const fileRef = storageRef(storage, `${folder}/${nameImage}`)
        await uploadBytes(fileRef, file)
        const getUrl = await getDownloadURL(fileRef)    
        return {name: nameImage,url: getUrl}
}

// Xóa ảnh
export const deleteImageFirebase = async (filePath: string) => {
    try {
        const fileRef = storageRef(storage, filePath)
        await deleteObject(fileRef)
        console.log("Xóa file thành công!")
    } catch (error) {
        console.error("Lỗi khi xóa file:", error)
    }
}

// Đọc tất cả ảnh
export const listAllImagesFirebase = async (folder: string = "uploads") => {
    try {
        const folderRef = storageRef(storage, folder)
        const res = await listAll(folderRef)

        // Lấy URL của tất cả file
        const urls = await Promise.all(
            res.items.map(async (itemRef) => {
                // const url = await getDownloadURL(itemRef)
                return {
                    name: itemRef.name, // tên file
                    url: await getDownloadURL(itemRef) // link tải
                }
            })
        )

        // const urls = []
        // for (const itemRef of res.items) {
        //     const url = await getDownloadURL(itemRef)
        //     urls.push({ name: itemRef.name, url })
        // }


        return urls
    } catch (error) {
        console.error("Lỗi khi đọc file:", error)
        return []
    }
}



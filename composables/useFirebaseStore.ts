import { initializeApp } from 'firebase/app'
import { getFirestore, QuerySnapshot } from 'firebase/firestore'
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, } from 'firebase/firestore'

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
const db = getFirestore(app)


// Lấy tất cả sản phẩm từ collection "products"
export const getProducts = async (path: any) => {
    const products = [] as any
    const querySnapshot = await getDocs(collection(db, 'card'))
    querySnapshot.forEach((doc) => {
        products.push({...doc.data() })
    })
    return products
}

// 🔹 Thêm sản phẩm mới
export const addProduct = async (product: any, path: any) => {
    try {
        const docRef = await addDoc(collection(db, 'path'), product)
        return docRef.id
    } catch (error) {
        console.error('Lỗi khi thêm:', error)
        throw error
    }
}

// 🔹 Cập nhật sản phẩm theo ID
export const updateProduct = async (id: any, data: any) => {
    try {
        const docRef = doc(db, 'products', id)
        await updateDoc(docRef, data)
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error)
        throw error
    }
}

// 🔹 Xoá sản phẩm theo ID
export const deleteProduct = async (id: any) => {
    try {
        const docRef = doc(db, 'products', id)
        await deleteDoc(docRef)
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        throw error
    }
}






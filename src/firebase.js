import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDk9SYe83rC7YubxmRRdVDytoPslB9lYCU",
  authDomain: "netflix-clone-1e965.firebaseapp.com",
  projectId: "netflix-clone-1e965",
  storageBucket: "netflix-clone-1e965.firebasestorage.app",
  messagingSenderId: "534626431589",
  appId: "1:534626431589:web:00bf591f93319fedf5cc8c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));

    }

}

const login = async(email, password)=>{
    try{
        signInWithEmailAndPassword(auth, email, password);

    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(""));

    }
}

const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};
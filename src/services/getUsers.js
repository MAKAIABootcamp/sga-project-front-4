import axios from "axios";
import { auth, dataBase } from "../firebase/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { collections } from "./data";
import { signInWithEmailAndPassword } from "firebase/auth";

const API_FAKE = "https://backend-sga-icqb.vercel.app/";

export const fuctionGet = async (endpoint) => {
  try {
    const { data } = await axios.get(`${API_FAKE}${endpoint}`);
    return data;
  } catch (error) {
    console.log("Error al realizar la peticion a la api", error);
    return [];
  }
};

const colection = collections.USUARIOS;
const refCollection = collection(dataBase, colection);

export const login = async (email, password) => {
  const usersFromCollection = [];
  try {
    const q = query(refCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      usersFromCollection.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    if (usersFromCollection.length) {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
       // Verifica el valor del rol antes de devolver el objeto user
       console.log("Rol del usuario:", usersFromCollection[0].rol);
       console.log("info del usuario:", usersFromCollection[0]);
      return usersFromCollection[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

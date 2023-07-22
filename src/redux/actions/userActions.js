import { login } from "../../services/getUsers";
//import { collections } from "../../services/data";
import { loginUser } from "../reducers/userReducer";
import { getUserFromCollection } from "../../services/getUsers";
import Swal from 'sweetalert2';

export const loginActionAsync = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await login(email, password);
      console.log(response)
      if (response) {
        dispatch(loginUser(response));
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: '¡Ingreso exitoso!'
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡El usuario no existe!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const keepInfoUserAction = (email) => {
  return async (dispatch) => {
    try {
      const user = await getUserFromCollection(email);
      dispatch(loginUser(user));
    } catch (error) {
      console.log(error);
    }
  }
}

// export const loginActionSync = (user) => {
//   return {
//     type: collections.USUARIOS,
//     payload: user,
//   };
// };
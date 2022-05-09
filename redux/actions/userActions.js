import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";

export const loginAction = ({ username, password, email }, router) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.post(`http://localhost:5000/auth/login`, {
        username,
        email,
        password,
      });
      console.log("res.data", res.data);
      dispatch({ type: "LOGIN", payload: res.data });
      // set cookies for nextjs
      console.log("res.headers", res.headers);
      Cookies.set("token", res.headers["x-token-access"]);
      toast.success("Welcome", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      Router.push("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.message || "network error" });
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const editAction = ({ username, fullname, bio, id }, router) => {
  return async (dispatch) => {
    try {
      let token = Cookies.get("token");
      dispatch({ type: "LOADING" });
      let res = await axios.put(
        `http://localhost:5000/edit/update-bio`,
        {
          username,
          fullname,
          bio,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPDATE", payload: res.data.editData });
      console.log("res.data", res.data);
      console.log("res.headers", res.headers);
      toast.success("Edit Successfull!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "network error",
      });
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const avatarAction = ({}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let res = await axios.get();
    } catch (error) {}
  };
};

// export const registerAction = ({ username, password, email }) => {
//   // cek dulu username yang sama di database
//   // kalo ada datanya berarti tidak bisa
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "LOADING" });
//       // ccek username yang sama ada atau tidak
//       let res = await axios.get(`${API_URL}/users`, {
//         params: {
//           username: username,
//         },
//       });
//       if (res.data.length) {
//         // jika username telah dipakai
//         throw { message: "usename telah digunakan" };
//       }
//       // add data new user to database
//       let res1 = await axios.post(`${API_URL}/users`, {
//         username,
//         password,
//         email,
//         roleId: 2,
//       });
//       dispatch({ type: "LOGIN", payload: res1.data });
//       // pasang id on localstorage
//       localStorage.setItem("id", res1.data.id);
//       toast.success("berhasil register", {
//         position: "top-right",
//         autoClose: 3000,
//         closeOnClick: true,
//         draggable: true,
//       });
//     } catch (error) {
//       dispatch({ type: "ERROR", payload: error.message || "network error" });
//       toast.error(error.message || "network error", {
//         position: "top-right",
//         autoClose: 3000,
//         closeOnClick: true,
//         draggable: true,
//       });
//     } finally {
//       dispatch({ type: "DONE" });
//     }
//   };
// };

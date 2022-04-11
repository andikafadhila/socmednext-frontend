// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// const AuthProvider = ({ children }) => {
//   const dispatch = useDispatch();
//   const [loading, setloading] = useState(true);
//   useEffect(async () => {
//     try {
//       let token = Cookies.get("token");
//       if (token) {
//         let result = await axios.get(`http://localhost:5000/auth/keeplogin`, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         dispatch({ type: "LOGIN", payload: result.data });
//       }
//     } catch (error) {
//       console.log("error");
//     } finally {
//       setloading(false);
//     }
//   }, []);

//   if (loading) {
//     return <div>loadinggg....</div>;
//   }

//   return children;
// };

// export default AuthProvider;

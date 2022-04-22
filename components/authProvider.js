import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Center, Progress } from "@chakra-ui/react";
import API_URL from "./apiurl";
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  useEffect(async () => {
    try {
      let token = Cookies.get("token");
      if (token) {
        let result = await axios.get(`${API_URL}/auth/keeplogin`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(result.data);
        dispatch({ type: "LOGIN", payload: result.data });
      }
    } catch (error) {
      console.log("error");
    } finally {
      setloading(false);
    }
  }, []);

  if (loading) {
    return (
      <Center>
        <Progress size="xl" isIndeterminate />
      </Center>
    );
  }

  return children;
};

export default AuthProvider;

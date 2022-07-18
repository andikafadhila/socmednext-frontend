import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Center, Progress } from "@chakra-ui/react";
import API_URL from "./apiurl";
import Head from "next/head";

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
      <>
        {/* <Head>
          <title>hohohoho</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="description"
            content="Checkout our cool page"
            key="desc"
          />
          <meta property="og:title" content="Social Title for Cool Page" />
          <meta
            property="og:description"
            content="And a social description for our cool page"
          />
          <meta
            property="twitter:image"
            content="https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.jpg"
          />
          <meta property="twitter:title" content="some title" />
          <meta
            property="og:image"
            content="https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.jpg"
          />
        </Head> */}
        <Center>
          <Progress size="xl" isIndeterminate />
        </Center>
      </>
    );
  }

  return children;
};

export default AuthProvider;

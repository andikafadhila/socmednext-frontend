import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../redux/reducers";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../components/authProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

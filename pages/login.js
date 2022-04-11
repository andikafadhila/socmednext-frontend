import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  Input,
  Button,
  Center,
  Stack,
  Heading,
  Text,
  FormHelperText,
} from "@chakra-ui/react";
import validator from "validator";
import baseUrl from "../utils/baseUrl";
import PhotoLab from "../public/PhotoLab.png";
import PhotoLabRegister from "../public/PhotoLabRegister.webp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginAction } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";

const login = ({ loginAction }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <Center h="100vh" className="bg-gray-50">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <div className="w-64 mx-auto">
          <Image src={PhotoLab} />
        </div>
        <Text fontSize="2xl" fontWeight="bold">
          Log In.
        </Text>
        <Text fontSize="md" color="gray.600">
          Please log in with the data you entered during registeration.
        </Text>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); // Prevent default submission
            loginAction({
              username: e.target.username.value,
              email: e.target.username.value,
              password: e.target.password.value,
            });
            router.push("/");
            // axios
            //   .post("http://localhost:5000/auth/login", {
            //     username: e.target.username.value,
            //     email: e.target.username.value,
            //     password: e.target.password.value,
            //   })
            //   .then((response) => {
            //     console.log(response);
            //     for (const key in response.data) {
            //       localStorage.setItem(key, response.data[key]);
            //     }
            //     router.push("/");
            //   })
            //   .catch((error) => {
            //     if (error.response) {
            //       setError(error.response.data.message);
            //     } else if (error.request) {
            //       setError(
            //         "We couldn't reach PhotoLab. Check your network connection."
            //       );
            //     } else {
            //       setError("Something went wrong!");
            //     }
            //     console.log(error);
            //     });
          }}
        >
          <FormControl display="flex" flexDirection="column">
            <Stack spacing={2} mx="auto">
              <Input
                isRequired
                size="md"
                name="username"
                id="Username"
                type="Username"
                placeholder="Username"
                width="xs"
              />
              <Input
                size="md"
                name="password"
                id="Password"
                type="Password"
                placeholder="Password"
                width="xs"
              />
            </Stack>
          </FormControl>
          <br />
          <Stack>
            <Button
              colorScheme="red"
              variant="solid"
              type="submit"
              disabled={false}
              width={20}
              mx="auto"
            >
              Submit
            </Button>
            {error ? (
              <FormHelperText color="red">{error}</FormHelperText>
            ) : null}
          </Stack>
        </form>
        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Don't have an account yet? </span>
            <Button colorScheme="red" variant="link">
              <Link href="/signup">Sign Up.</Link>
            </Button>
          </Text>
          <Button colorScheme="red" variant="link">
            Forgot password?
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
};

export default connect(null, { loginAction })(login);

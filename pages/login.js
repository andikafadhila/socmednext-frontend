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
} from "@chakra-ui/react";
import validator from "validator";
import baseUrl from "../utils/baseUrl";
import PhotoLab from "../public/PhotoLab.png";
import PhotoLabRegister from "../public/PhotoLabRegister.webp";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  
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
            e.preventDefault();
            const usernameErrors = await validateUsername();
            const emailErrors = await validateEmail();
            const passwordErrors = validatePassword();
            const confirmPasswordErrors = validateConfirmPassword();
            setUsernameErrors(usernameErrors);
            setEmailErrors(emailErrors);
            setPasswordErrors(passwordErrors);
            setConfirmPasswordErrors(confirmPasswordErrors);

            if (
              usernameErrors.length ||
              emailErrors.length ||
              passwordErrors.length ||
              confirmPasswordErrors.length
            ) {
              console.log("check failed");
            } else {
              axios
                .post(process.env.MONGODB_URI + "/register", {
                  username,
                  password,
                  email,
                })
                .then((response) => {
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("username", response.data.username);
                  history.push("/");
                });
            }
          }}
        >
          <FormControl display="flex" flexDirection="column">
            <Stack spacing={2} mx="auto">
              <Input
                isRequired
                size="md"
                id="Username"
                type="Username"
                placeholder="Username"
                width="xs"
              />
              <Input
                size="md"
                id="Password"
                type="Password"
                placeholder="Password"
                width="xs"
              />
            </Stack>
          </FormControl>
        </form>
        <br />
        <Stack>
          <Button
            colorScheme="red"
            variant="solid"
            type="submit"
            disabled={true}
            width={20}
            mx="auto"
          >
            Submit
          </Button>
        </Stack>

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

export default Register;

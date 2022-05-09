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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import validator from "validator";
import baseUrl from "../utils/baseUrl";
import PhotoLab from "../public/PhotoLab.png";
import PhotoLabRegister from "../public/PhotoLabRegister.webp";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const login = () => {
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [allValid, setAllValid] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [buttonLoading, setButtonLoading] = useState(false);

  // ===== Validate Username =====

  const validateUsername = async () => {
    const errors = [];

    const response = await axios.post(
      "http://localhost:5000/auth/getusername",
      {
        username: username,
      }
    );
    if (response.data.exists) {
      errors.push("Username already registered.");
    }
    return errors;
  };

  // =====      Validate Username           =====

  // =====      Validate Email              =====

  const validateEmail = async () => {
    const errors = [];
    const normalizedEmail = validator.normalizeEmail(email);
    if (!validator.isEmail(normalizedEmail)) {
      errors.push("Please enter a valid email.");
    }
    const response = await axios.post("http://localhost:5000/auth/getemail", {
      email: email,
    });
    if (response.data.exists) {
      errors.push("Email already registered.");
    }
    return errors;
  };

  // =====       Validate Email             =====

  // =====       Validate Password          =====

  const validatePassword = () => {
    const errors = [];

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      errors.push(
        "Passwords must be at least 8 characters, including uppercase letter, a symbol, and a number."
      );
    }
    return errors;
  };

  // =====       Validate Password          =====

  // =====       Validate Confirm password  =====

  const validateConfirmPassword = () => {
    const errors = [];
    if (confirmPassword !== password) {
      errors.push("Passwords do not match.");
    }
    return errors;
  };

  // =====       Validate Confirm password  =====

  useEffect(() => {
    const validate = async () => {
      const usernameErrors = await validateUsername();
      const emailErrors = await validateEmail();
      const passwordErrors = validatePassword();
      const confirmPasswordErrors = validateConfirmPassword();
      if (
        usernameErrors.length ||
        emailErrors.length ||
        passwordErrors.length ||
        confirmPasswordErrors.length
      ) {
        setAllValid(false);
      } else {
        setAllValid(true);
      }
    };
    validate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, email, password, confirmPassword]);

  useEffect(() => {
    setConfirmPasswordErrors(validateConfirmPassword());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  return (
    <Center h="100vh" className="bg-gray-50">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md" w="90vh">
        <div className="w-64 mx-auto">
          <Image src={PhotoLab} />
        </div>
        <Text fontSize="2xl" fontWeight="bold">
          Sign Up.
        </Text>
        <Text fontSize="md" color="gray.600">
          Please log in with the data you entered during registration.
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
              throw { message: "Check Error!" };
            } else {
              try {
                setButtonLoading(true);
                console.log(buttonLoading, "try");
                await axios.post("http://localhost:5000/auth/register", {
                  username,
                  password,
                  email,
                });
                toast.success("Register Success, please check your email!", {
                  position: "top-right",
                  autoClose: 3000,
                  closeOnClick: true,
                  draggable: true,
                });
              } catch (error) {
                console.log(error.response.data.message || "network error");
              } finally {
                console.log(buttonLoading, "finally");
                setButtonLoading(false);
              }
            }
          }}
        >
          <FormControl display="flex" flexDirection="column">
            <Stack spacing={2} mx="auto">
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                onBlur={async () => {
                  setUsernameErrors(await validateUsername());
                }}
                size="md"
                name="username"
                id="Username"
                type="Username"
                placeholder="Username"
                width="xs"
              />
              {usernameErrors.map((errors) => {
                return <FormHelperText color="red">{errors}</FormHelperText>;
              })}
              <Input
                novalidate
                onBlur={async () => {
                  setEmailErrors(await validateEmail());
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                size="md"
                name="email"
                id="Email"
                type="Email"
                placeholder="Email"
                width="xs"
              />
              {emailErrors.map((errors) => {
                return (
                  <FormHelperText color="red">
                    <span className="whitespace-pre-line">{errors}</span>
                  </FormHelperText>
                );
              })}
              <InputGroup>
                <Input
                  onBlur={() => {
                    setPasswordErrors(validatePassword());
                  }}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  size="md"
                  name="password"
                  id="Password"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  width="xs"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordErrors.map((errors) => {
                return <FormHelperText color="red">{errors}</FormHelperText>;
              })}
              <Input
                onBlur={() => {
                  setConfirmPasswordErrors(validateConfirmPassword());
                }}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                size="md"
                id="Confirm Password"
                type="Password"
                placeholder="Confirm Password"
                width="xs"
              />
              {confirmPasswordErrors.map((errors) => {
                return <FormHelperText color="red">{errors}</FormHelperText>;
              })}
            </Stack>
          </FormControl>
          <br />
          <Stack>
            {!buttonLoading ? (
              <Button
                isLoading={false}
                disabled={!allValid}
                type="submit"
                colorScheme="red"
                variant="solid"
                width={20}
                mx="auto"
              >
                Submit
              </Button>
            ) : (
              <Button
                isLoading={true}
                disabled={true}
                type="submit"
                colorScheme="red"
                variant="solid"
                width={20}
                mx="auto"
              >
                Submit
              </Button>
            )}
          </Stack>
        </form>

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Already have an account?</span>
            <Button colorScheme="red" variant="link">
              <Link href="/login">Log In.</Link>
            </Button>
          </Text>
        </Stack>
      </Stack>
      <ToastContainer />
    </Center>
  );
};

export default login;

import React, { useEffect, useState, useRef } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import PhotoLab from "../public/PhotoLab.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginAction } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../components/apiurl";
import validator from "validator";

const Login = ({ loginAction }) => {
  const [error, setError] = useState("");
  const [emailForget, setEmailForget] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [buttonLoading, setButtonLoading] = useState(false);

  const sendEmailForgetPassword = async () => {
    try {
      await axios.post(`${API_URL}/auth/sendemail-forgetpassword`, {
        email: emailForget,
      });
      toast.success("Check Your Email!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      setEmailForget("");
    } catch (error) {
      console.log(error.response.data.message || "network error");
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } finally {
      onClose();
    }
  };

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
            try {
              setButtonLoading(true);
              await loginAction({
                username: e.target.username.value,
                email: e.target.username.value,
                password: e.target.password.value,
              });
            } catch (error) {
              console.log(error);
            } finally {
              setButtonLoading(false);
            }
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
                placeholder="Username/Email"
                width="xs"
              />
              <InputGroup>
                <Input
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
            </Stack>
          </FormControl>
          <br />
          <Stack>
            {buttonLoading ? (
              <Button
                isLoading={true}
                colorScheme="red"
                variant="solid"
                type="submit"
                disabled={true}
                width={20}
                mx="auto"
              >
                Submit
              </Button>
            ) : (
              <Button
                isLoading={false}
                colorScheme="red"
                variant="solid"
                type="submit"
                disabled={false}
                width={20}
                mx="auto"
              >
                Submit
              </Button>
            )}

            {error ? (
              <FormHelperText color="red">{error}</FormHelperText>
            ) : null}
          </Stack>
        </form>
        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Don&apos;t have an account yet? </span>
            <Button colorScheme="red" variant="link">
              <Link href="/signup">Sign Up.</Link>
            </Button>
          </Text>
          <Button colorScheme="red" variant="link" onClick={onOpen}>
            Forgot password?
          </Button>
        </Stack>
      </Stack>
      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Type your email.</ModalHeader>
          <ModalCloseButton />
          <form action="" onSubmit={sendEmailForgetPassword}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={initialRef}
                  value={emailForget}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmailForget(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                disabled={!validator.isEmail(emailForget)}
              >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default connect(null, { loginAction })(Login);

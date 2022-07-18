import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
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
  InputRightElement,
  InputGroup,
  Link,
} from "@chakra-ui/react";
import PhotoLab from "../../public/PhotoLab.png";
import Image from "next/image";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../../components/apiurl";

const ResetPassword = (props) => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(1);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);

  const handleClickNew = () => setShowNew(!showNew);
  const [showNew, setShowNew] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);

  const [allValid, setAllValid] = useState(false);

  const validatePassword = () => {
    const errors = [];
    if (!validator.isLength(password, { min: 8, max: undefined })) {
      errors.push("Passwords must be at least 8 characters.");
    }

    return errors;
  };

  const validateConfirmPassword = () => {
    const errors = [];
    if (confirmPassword !== password) {
      errors.push("Passwords do not match.");
    }
    return errors;
  };

  useEffect(() => {
    const validate = async () => {
      const passwordErrors = validatePassword();
      const confirmPasswordErrors = validateConfirmPassword();
      if (passwordErrors.length || confirmPasswordErrors.length) {
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

  // 0 loading 2: gagal 1:berhasil
  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:5000/auth/reset-password`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setstatus(1);
    } catch (error) {
      console.log(error);
      console.log(token);
      console.log(error.response.data.message);
      setstatus(2);
    } finally {
      setloading(false);
    }
  }, []);

  const sendEmail = async () => {
    try {
      setloading(true);
      console.log(token);
      const res = await axios.post(
        `${API_URL}/auth/sendemail-resetpassword`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/login");
      toast.success("Check your email", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.image, {
        position: "top-right",
      });
    } finally {
      setloading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword();
    const confirmPasswordErrors = validateConfirmPassword();

    setPasswordErrors(passwordErrors);
    setConfirmPasswordErrors(confirmPasswordErrors);
    if (passwordErrors.length || confirmPasswordErrors.length) {
      console.log("check failed");
    } else {
      try {
        const res = await axios.post(
          `${API_URL}/auth/newpassword`,
          {
            newPassword: password,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "network error", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="mx-auto my-auto">
        <div>Loading....</div>
      </div>
    );
  }

  if (status === 1) {
    return (
      <Center h="100vh" className="bg-gray-50">
        <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
          <div className="w-64 mx-auto">
            <Image src={PhotoLab} />
          </div>
          <Text fontSize="2xl" fontWeight="bold">
            New password.
          </Text>
          <Text fontSize="md" color="gray.600">
            Please retype your password.
          </Text>
          <form onSubmit={submitHandler}>
            <FormControl display="flex" flexDirection="column">
              <Stack spacing={2} mx="auto">
                <InputGroup>
                  <Input
                    isRequired
                    size="md"
                    name="newPassword"
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    placeholder="New Password"
                    width="xs"
                    onBlur={() => {
                      setPasswordErrors(validatePassword());
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickNew}>
                      {showNew ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordErrors.map((errors, i) => {
                  return (
                    <FormHelperText color="red" key={i}>
                      {errors}
                    </FormHelperText>
                  );
                })}
                <InputGroup>
                  <Input
                    size="md"
                    name="retypePassword"
                    id="retypePassword"
                    type={show ? "text" : "password"}
                    placeholder="Retype Password"
                    width="xs"
                    onBlur={() => {
                      setConfirmPasswordErrors(validateConfirmPassword());
                    }}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {confirmPasswordErrors.map((errors, i) => {
                  return (
                    <FormHelperText color="red" key={i}>
                      {errors}
                    </FormHelperText>
                  );
                })}
              </Stack>
            </FormControl>
            <br />
            <Stack>
              <Button
                colorScheme="red"
                variant="solid"
                type="submit"
                width={20}
                mx="auto"
                disabled={!allValid}
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
              <span>Wan to go to log in page? </span>
              <Button colorScheme="red" variant="link">
                <Link href="/login">log in.</Link>
              </Button>
            </Text>
          </Stack>
        </Stack>
        <ToastContainer />
      </Center>
    );
  }

  return (
    <Center h="100vh" className="bg-gray-50">
      <Stack boxShadow="md" bg="whiteAlpha.900" p="20" rounded="md">
        <div className="w-64 mx-auto">
          <Image src={PhotoLab} />
        </div>
        <Center>
          <Text fontSize="2xl" fontWeight="bold">
            Token Expired!
          </Text>
        </Center>
        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Resend Reset Password Email? </span>
            <Button colorScheme="red" variant="link">
              <Link onClick={sendEmail}>Send Email.</Link>
            </Button>
          </Text>
        </Stack>
        {/* {isLogin ? (
          <Stack justify="center" color="gray.600" spacing="3">
            <Text as="div" textAlign="center">
              <span>Resend Reset Password Email? </span>
              <Button colorScheme="red" variant="link">
                <Link onClick={sendEmail}>Send Email.</Link>
              </Button>
            </Text>
          </Stack>
        ) : (
          <Stack justify="center" color="gray.600" spacing="3">
            <Text as="div" textAlign="center">
              <span>Back to Login page? </span>
              <Button colorScheme="red" variant="link">
                <Link href="/login">Login.</Link>
              </Button>
            </Text>
          </Stack>
        )} */}
      </Stack>
      <ToastContainer />
    </Center>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default ResetPassword;

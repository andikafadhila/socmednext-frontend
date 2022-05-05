import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

const resetPassword = (props) => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(1);
  // const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleClick = () => setShow(!show);
  const [show, setShow] = useState(false);

  const handleClickNew = () => setShowNew(!showNew);
  const [showNew, setShowNew] = useState(false);

  // 0 loading 2: gagal 1:berhasil
  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:5000/auth/forget-password`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setstatus(1);
    } catch (error) {
      console.log(error);
      setstatus(2);
    } finally {
      setloading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="mx-auto my-auto">
        <div>Loading bro....</div>
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
          <form
            onSubmit={async (e) => {
              e.preventDefault(); // Prevent default submission
              loginAction({
                username: e.target.username.value,
                email: e.target.username.value,
                password: e.target.password.value,
              });
            }}
          >
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
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickNew}>
                      {showNew ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Input
                    size="md"
                    name="retypePassword"
                    id="retypePassword"
                    type={show ? "text" : "password"}
                    placeholder="Retype Password"
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
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>gagal verified</div>
      <div>
        {/* {kalo belum login jangan sediakan button} */}
        {isLogin ? (
          <button className="bg-slate-300" onClick={sendEmail}>
            kriim ulang bro
          </button>
        ) : null}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default resetPassword;

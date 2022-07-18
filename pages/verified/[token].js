import { Link } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import Image from "next/image";
import PhotoLab from "../../public/PhotoLab.png";
import { ToastContainer, toast } from "react-toastify";

import { Button, Center, Stack, Text } from "@chakra-ui/react";
import API_URL from "../../components/apiurl";

const Verified = (props) => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
  console.log(token);
  // 0 loading 2: gagal 1:berhasil
  useEffect(async () => {
    try {
      let res = await axios.get(`http://localhost:5000/auth/verified`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //   kalo register langsung login better kriim datanya ke redux
      dispatch({ type: "LOGIN", payload: res.data });
      setstatus(1);
    } catch (error) {
      console.log(error);
      setstatus(2);
    } finally {
      setloading(false);
    }
  }, []);

  const sendEmail = async () => {
    try {
      setloading(true);
      const res = await axios.post(
        `${API_URL}/auth/resendemail-verified`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
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
          <Center>
            <Text fontSize="2xl" fontWeight="bold">
              Your Account is verified!
            </Text>
          </Center>

          <Stack justify="center" color="gray.600" spacing="3">
            <Text as="div" textAlign="center">
              <span>Please login here </span>
              <Button colorScheme="red" variant="link">
                <Link href="/login">log in.</Link>
              </Button>
            </Text>
          </Stack>
        </Stack>
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
            Your Account failed to verified!
          </Text>
        </Center>
        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Resend verification Email? </span>
            <Button colorScheme="red" variant="link">
              <Link onClick={sendEmail}>Send Email.</Link>
            </Button>
          </Text>
        </Stack>
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

export default Verified;

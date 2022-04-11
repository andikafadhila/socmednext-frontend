import { Link } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";

const Verified = (props) => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
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
      await axios.post(`${API_URL}/auth/sendemail-verified`, {
        id: id,
        username,
      });
      toast.success("berhasil kirim email", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      toast.error("gagal kirim", {
        position: "top-right",
      });
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div>Loading bro....</div>
      </div>
    );
  }

  if (status === 1) {
    return (
      <div className="flex justify-center items-center">
        <div>yeayy berhasill verified</div>
        <div>
          <Link href="/login">sini login</Link>
        </div>
      </div>
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

export default Verified;

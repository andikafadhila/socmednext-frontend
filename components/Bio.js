import { Box, Divider, Link } from "@chakra-ui/react";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import validator from "validator";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { editAction } from "../redux/actions/userActions";
import { connect, useSelector } from "react-redux";
import API_URL from "../components/apiurl";
import Cookies from "js-cookie";

function Bio({ editAction }) {
  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();
  const {
    isOpen: isEditavatarOpen,
    onOpen: onEditavatarOpen,
    onClose: onEditavatarClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const initialRef = React.useRef();

  const { bio, fullname, profilepic, username, email, id } = useUser();

  const [usernameErrors, setUsernameErrors] = useState([]);
  const [fullnameErrors, setFullnameErrors] = useState([]);
  const [bioErrors, setBioErrors] = useState([]);

  const [editusername, setEditusername] = useState(username);
  const [editfullname, setEditfullname] = useState(fullname);
  const [editbio, setEditbio] = useState(bio);

  const [allValid, setAllValid] = useState(false);

  //change profile picture
  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

  const submitPhoto = async () => {
    try {
      let token = Cookies.get("token");
      let formData = new FormData();
      formData.append("avatar", selectedImage.file);

      await axios.all([
        axios.put(`${API_URL}/edit`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      ]);

      await toast.success("Update photo Successfull!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setselectedImage({
        ...selectedImage,
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const deleteAvatar = async () => {
    try {
      let token = Cookies.get("token");

      await axios.put(`${API_URL}/edit/delete-avatar`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("Avatar Deleted", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "network error", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  // Validate

  const validateUsername = async () => {
    const errors = [];

    const response = await axios.post(`${API_URL}/edit/getuserbyid`, {
      username: editusername,
      id,
    });
    if (response.data.exists) {
      errors.push("Username already registered.");
    }
    return errors;
  };

  const validateFullname = () => {
    const errors = [];
    if (!validator.isLength(editfullname, { min: 3, max: 25 })) {
      errors.push("fullname must be 3-25 characters.");
    }
    return errors;
  };

  const validateBio = () => {
    const errors = [];
    if (!validator.isLength(editbio, { max: 140 })) {
      errors.push("Maximum character for Bio is 140.");
    }
    return errors;
  };

  useEffect(() => {
    const validate = async () => {
      const usernameErrors = await validateUsername();
      const fullnameErrors = validateFullname();
      const bioErrors = validateBio();
      if (usernameErrors.length || fullnameErrors.length || bioErrors.length) {
        setAllValid(false);
      } else {
        setAllValid(true);
      }
    };
    validate();
  }, [editusername, editfullname, editbio]);

  const avatar = profilepic
    ? `${API_URL}${profilepic}`
    : `${API_URL}/avatar/default.jpg`;

  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-4xl mx-auto my-8">
        <div className="col-span-1">
          <img
            src={avatar}
            alt="profile picture"
            className="h-48 w-48 object-cover rounded-full cursor-pointer"
            onClick={onAvatarOpen}
          />
        </div>

        <section className="xl:inline-grid md:col-span-1">
          <div className="flex-row mt-7">
            <div className="flex gap-3 items-center">
              <p className="font-thin text-3xl">@{username}</p>
              <Button background="white" onClick={onEditOpen}>
                Edit Profile
              </Button>
            </div>
            <div className="flex my-3">
              <div className="font-semibold">Posts</div>
              <div className="ml-3">100</div>
            </div>
            <div className="font-bold text-lg">{fullname}</div>
            <div className="font-extralight text-sm">{email}</div>
            <div>{bio}</div>
          </div>
        </section>
      </main>
      <Divider />
      {/* Modal edit profile picture */}
      <Modal isOpen={isAvatarOpen} onClose={onAvatarClose} isCentered>
        <ModalOverlay />
        <ModalContent flexDirection="column">
          <ModalHeader>Change Profile Picture</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <Center>
              <Link
                color="blue.300"
                fontWeight="semibold"
                margin={2}
                onClick={onEditavatarOpen}
              >
                Upload Photo
              </Link>
            </Center>
            <Divider />
            <Center>
              <Link
                color="red"
                fontWeight="semibold"
                margin={2}
                onClick={deleteAvatar}
              >
                Remove Current Photo
              </Link>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal edit profile picture */}

      {/* Modal submit Avatar */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isEditavatarOpen}
        onClose={onEditavatarClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <input
                className="hidden"
                type="file"
                id="avatar"
                onChange={onFileChange}
              />
              <label for="avatar">
                {profilepic && selectedImage.filePreview ? (
                  <img
                    src={selectedImage.filePreview}
                    className="h-48 w-48 object-cover rounded-full cursor-pointer"
                    for="avatar"
                  />
                ) : null}
                {!profilepic && selectedImage.filePreview ? (
                  <img
                    src={selectedImage.filePreview}
                    className="h-48 w-48 object-cover rounded-full cursor-pointer"
                    for="avatar"
                  />
                ) : null}
                {profilepic && !selectedImage.filePreview ? (
                  <img
                    src={avatar}
                    className="h-48 w-48 object-cover rounded-full cursor-pointer"
                    for="avatar"
                  />
                ) : null}
                {!profilepic && !selectedImage.filePreview ? (
                  <img
                    src={avatar}
                    className="h-48 w-48 object-cover rounded-full cursor-pointer"
                    for="avatar"
                  />
                ) : null}
              </label>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={submitPhoto}
              for="profilePic"
            >
              Save
            </Button>
            <Button onClick={onEditavatarClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal submit Avatar */}

      {/* Modal edit Bio and FullName */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isEditOpen}
        onClose={onEditClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={async (e) => {
              editAction({
                username: e.target.editusername.value,
                fullname: e.target.editfullname.value,
                bio: e.target.editbio.value,
              });
            }}
          >
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Username"
                  value={editusername}
                  name="editusername"
                  onChange={(e) => {
                    setEditusername(e.target.value);
                  }}
                  onBlur={async () => {
                    setUsernameErrors(await validateUsername());
                  }}
                />
                {usernameErrors.map((errors) => {
                  return <FormHelperText color="red">{errors}</FormHelperText>;
                })}
              </FormControl>

              <FormControl>
                <FormLabel>Full name</FormLabel>
                <Input
                  placeholder="Full name"
                  value={editfullname}
                  name="editfullname"
                  onChange={(e) => {
                    setEditfullname(e.target.value);
                  }}
                  onBlur={() => {
                    setFullnameErrors(validateFullname());
                  }}
                />
                {fullnameErrors.map((errors) => {
                  return <FormHelperText color="red">{errors}</FormHelperText>;
                })}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Bio"
                  value={editbio}
                  name="editbio"
                  onChange={(e) => {
                    setEditbio(e.target.value);
                  }}
                  onBlur={() => {
                    setBioErrors(validateBio());
                  }}
                />
                {bioErrors.map((errors) => {
                  return <FormHelperText color="red">{errors}</FormHelperText>;
                })}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                disabled={!allValid}
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onEditClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {/* Modal edit Bio and FullName */}
      <ToastContainer />
    </div>
  );
}

export default connect(null, { editAction })(Bio);

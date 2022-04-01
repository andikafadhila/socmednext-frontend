import { Box } from "@chakra-ui/react";
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
  Button,
} from "@chakra-ui/react";

function Bio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto cover">
        <img
          src="https://foto.wartaekonomi.co.id/files/arsip_foto_2019_11_16/otomotif_215524_small.jpg"
          alt="profile picture"
          className="h-48 w-48 object-cover rounded-full cursor-pointer"
          onClick={onOpen}
        />
      </main>
      {/* Modal edit profile picture */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="row">
            <Button>Upload Photo</Button>
            <Button>Remove Current Photo</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal edit profile picture */}
    </div>
  );
}

export default Bio;

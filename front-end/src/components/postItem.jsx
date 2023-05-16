import {
  Box,
  Flex,
  Avatar,
  Text,
  Spacer,
  Button,
  Image,
  IconButton,
  Stack,
  useDisclosure,
  Textarea,
  FormControl,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowUpIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { useState } from "react";
import { FormLabel } from "react-bootstrap";

function PostItem({
  usernames,
  caption,
  likes,
  id,
  image,
  createdAt,
  profile,
  user_id,
}) {
  const [username, setUsername] = useState([]);
  const [liked, setLiked] = useState(likes);
  const [bufferCaption, setBufferCaption] = useState();
  const [updateCaption, setUpdateCaption] = useState(caption);

  const captionSave = (params) => {
    setBufferCaption(params.target.value);
  };

  const editPost = async (params) => {
    try {
      console.log(bufferCaption);
      let data = {
        caption: bufferCaption,
      };

      console.log(data);
      const url = `http://localhost:2000/api/post/${id}`;
      await axios
        .patch(url, data, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(
          alert("Post Updated"),
          onClose(),
          setUpdateCaption(bufferCaption)
        );
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const deletePost = async () => {
    try {
      const url = `http://localhost:2000/api/post/${id}`;
      await axios.delete(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete post!");
    }
  };
  const handleLike = async () => {
    try {
      const result = await axios
        .post(`http://localhost:2000/api/like/${id}`, null, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(setLiked(liked + 1));
    } catch (err) {
      if (err.response.data.message === "Post has already been liked") {
        const result = await axios
          .delete(`http://localhost:2000/api/like/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(setLiked(liked - 1));
      }
      console.log(err);
    }
  };

  let deleteButton = "";

  if (user_id != localStorage.getItem("user_id")) {
    deleteButton = (
      <IconButton
        onClick={deletePost}
        aria-label="Delete Post"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="red"
      />
    );
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box maxW="80%" m="auto" mb={8}>
      <Stack gap={2}>
        <Flex align="center" gap={4}>
          <Avatar
            size="md"
            src={"http://".concat(profile)}
            border="solid 1px grey"
          ></Avatar>
          <Text
            fontSize="18"
            fontWeight="bold
          "
          >
            {usernames}
          </Text>
          <Text fontSize="15">{createdAt}</Text>
          <Spacer></Spacer>
          <IconButton
            aria-label="Edit Post"
            icon={<EditIcon />}
            variant="ghost"
            colorScheme="blue"
            onClick={onOpen}
          />
          {deleteButton}
        </Flex>
        <Box>
          <Image
            src={"http://".concat(image)}
            alt="Post Content"
            w="100%"
            objectFit="cover"
            mb={2}
          />
          <Flex align={"center"} gap={4}>
            <IconButton
              onClick={handleLike}
              aria-label="Like Post"
              icon={<ArrowUpIcon />}
              variant="outline"
              colorScheme="red"
            />
            <Text>{liked}</Text>
          </Flex>
        </Box>
        <Text noOfLines={2}>{updateCaption}</Text>
        <Button
          justifyContent="left"
          variant="link"
          colorScheme="blue"
          fontWeight="normal"
          as={Link}
          to={"/post/".concat(id)}
        >
          See Details
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Caption</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="caption">
              <FormLabel>Caption</FormLabel>
              <Textarea onChange={captionSave}></Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" ml={3} onClick={editPost}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
export default PostItem;

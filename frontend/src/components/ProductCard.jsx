import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageError, setImageError] = useState("");

  const textColor = useColorModeValue("gray.600", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");
  const badgeBg = useColorModeValue("blue.50", "blue.800");
  const badgeColor = useColorModeValue("blue.500", "blue.200");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Deleted Successfully" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const isValidImageUrl = updatedProduct.image.match(/\.(jpeg|jpg|gif|png)$/);
    if (!isValidImageUrl) {
      setImageError("Please provide a valid image URL.");
      return;
    }

    setIsUpdating(true);
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsUpdating(false);
    onClose();

    toast({
      title: success ? "Updated Successfully" : "Error",
      description: success ? "Product updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

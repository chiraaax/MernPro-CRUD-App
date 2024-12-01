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

  return (
    <Box
      shadow="lg"
      rounded="xl"
      overflow="hidden"
      bg={cardBg}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{ transform: "scale(1.03)", shadow: "2xl" }}
      role="group"
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={product.image}
          alt={product.name}
          h={56}
          w="full"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400x300"
          transition="all 0.3s"
          _groupHover={{ filter: "brightness(80%)" }}
        />
        <Tag
          position="absolute"
          top={3}
          left={3}
          bg={badgeBg}
          color={badgeColor}
          fontWeight="bold"
        >
          ${product.price}
        </Tag>
      </Box>

      <Box p={6}>
        <Heading
          as="h3"
          size="md"
          mb={3}
          color={textColor}
          transition="color 0.3s"
          _groupHover={{ color: "blue.500" }}
        >
          {product.name}
        </Heading>

        <HStack justify="space-between">
          <Tooltip label="Edit Product" placement="top" hasArrow>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
              aria-label="Edit Product"
              size="sm"
            />
          </Tooltip>
          <Tooltip label="Delete Product" placement="top" hasArrow>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
              aria-label="Delete Product"
              size="sm"
            />
          </Tooltip>
        </HStack>
      </Box>

      {/* Update Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton isDisabled={isUpdating} />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                isDisabled={isUpdating}
              />
              <Input
                placeholder="Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
                isDisabled={isUpdating}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
                isDisabled={isUpdating}
              />
              {imageError && (
                <Text fontSize="sm" color="red.500">
                  {imageError}
                </Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              isLoading={isUpdating}
              loadingText="Updating"
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose} isDisabled={isUpdating}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

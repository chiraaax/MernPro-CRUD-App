import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW="container.sm" py={12}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>

        <Text fontSize="md" color="gray.500" textAlign="center" mb={4}>
          Add your product details below to get started!
        </Text>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          rounded="lg"
          shadow="lg"
        >
          <VStack spacing={6}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              focusBorderColor="blue.400"
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              focusBorderColor="blue.400"
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              focusBorderColor="blue.400"
            />

            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              size="lg"
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

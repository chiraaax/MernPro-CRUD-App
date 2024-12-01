import { Container, SimpleGrid, Text, VStack, Spinner, Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={12} minH="80vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={8}>
          <Spinner size="xl" />
          <Text fontSize="xl" fontWeight="semibold">
            Loading products...
          </Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={12} minH="80vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={8}>
          <Text color="red.500" fontSize="lg" fontWeight="bold">
            {error}
          </Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={12}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={8}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <VStack spacing={4}>
            <Text fontSize="xl" fontWeight="bold" color="gray.500" textAlign="center">
              No products found 😢
            </Text>
            <Link to="/create">
              <Button colorScheme="blue" size="lg" px={6} borderRadius="full" _hover={{ bg: "blue.600" }}>
                Create a Product
              </Button>
            </Link>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;


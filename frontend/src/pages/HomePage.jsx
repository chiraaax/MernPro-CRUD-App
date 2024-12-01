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

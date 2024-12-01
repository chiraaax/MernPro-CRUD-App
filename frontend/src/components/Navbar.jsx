import { Button, Container, Flex, HStack, Text, useColorMode, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.900"}
      shadow="md"
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="1140px">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          {/* Logo */}
          <Text
            fontSize={{ base: "24px", sm: "30px" }}
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            mb={{ base: 2, sm: 0 }}
            transition="color 0.3s"
            _hover={{ color: "blue.500" }}
          >
            <Link to="/">Product Store 🛒</Link>
          </Text>

          <HStack spacing={4} alignItems="center">
            {/* Create Product Button */}
            <Link to="/create">
              <Button
                colorScheme="blue"
                leftIcon={<PlusSquareIcon fontSize={20} />}
                size="md"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)" }}
              >
                Add Product
              </Button>
            </Link>

            {/* Dark Mode Toggle */}
            <Button
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              p={2}
              rounded="full"
              transition="background-color 0.2s"
              _hover={{
                bg: colorMode === "light" ? "gray.200" : "gray.700",
              }}
            >
              {colorMode === "light" ? <IoMoon size="20" /> : <LuSun size="20" />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};


export default Navbar;

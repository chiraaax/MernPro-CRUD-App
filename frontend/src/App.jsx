import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

// Fallback for invalid routes
const NotFoundPage = () => (
	<Center h="100vh">
		<Box textAlign="center">
			<h1>Page Not Found</h1>
		</Box>
	</Center>
);

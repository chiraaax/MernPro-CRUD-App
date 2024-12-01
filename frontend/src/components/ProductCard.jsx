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

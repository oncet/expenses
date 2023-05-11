import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Link,
  chakra,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";
import { useRef } from "react";

import { MoonIcon } from "@chakra-ui/icons";
import BanknotesIcon from "./icons/BanknotesIcon";
import Bars3Icon from "./icons/Bars3Icon";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { toggleColorMode } = useColorMode();

  return (
    <chakra.header>
      <HStack justifyContent="space-between">
        <Heading as="h1" size="md" fontWeight="light">
          <Link as={RemixLink} to="/">
            <HStack>
              <BanknotesIcon />
              <span>Expenses App</span>
            </HStack>
          </Link>
        </Heading>
        <Button leftIcon={<Bars3Icon />} ref={btnRef} onClick={onOpen}>
          Menu
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Navigation</DrawerHeader>
            <DrawerBody>Aló</DrawerBody>
            <DrawerFooter>
              <IconButton
                icon={<MoonIcon />}
                aria-label="Toggle dark mode"
                onClick={toggleColorMode}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </HStack>
    </chakra.header>
  );
}

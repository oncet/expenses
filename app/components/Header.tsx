import { Link as RemixLink } from "@remix-run/react";
import { chakra, Heading, IconButton } from "@chakra-ui/react";
import BanknotesIcon from "./icons/BanknotesIcon";
import { HStack, Link } from "@chakra-ui/react";
import Bars3Icon from "./icons/Bars3Icon";

export default function Header() {
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
        <IconButton icon={<Bars3Icon />} aria-label="menu" />
      </HStack>
    </chakra.header>
  );
}

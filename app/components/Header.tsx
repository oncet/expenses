import { Link as RemixLink } from "@remix-run/react";
import { chakra, Heading } from "@chakra-ui/react";
import BanknotesIcon from "./icons/BanknotesIcon";
import { HStack, Link } from "@chakra-ui/react";

export default function Header() {
  return (
    <chakra.header>
      <Heading as="h1" size="md" fontWeight="light">
        <Link as={RemixLink} to="/">
          <HStack>
            <BanknotesIcon />
            <span>Expenses App</span>
          </HStack>
        </Link>
      </Heading>
    </chakra.header>
  );
}

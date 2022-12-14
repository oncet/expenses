import { chakra, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <chakra.header>
      <Heading as="h1" size="md">
        Expenses
      </Heading>
    </chakra.header>
  );
}

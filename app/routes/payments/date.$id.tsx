import {
  Box,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import PlusIcon from "~/components/icons/PlusIcon";

const data = [
  {
    id: 1,
    description: "Personal",
    date: "10 oct",
    amount: 8000,
  },
  {
    id: 2,
    description: "Alquiler",
    date: "10 oct",
    amount: 8000,
  },
  {
    id: 3,
    description: "Tarjeta",
    date: "10 oct",
    amount: 8000,
  },
];

export default function ViewDate() {
  const borderColor = useColorModeValue("gray.300", "blue.800");

  return (
    <Stack spacing="4">
      <Stack>
        <Heading as="h2">October</Heading>
        <Text>
          <Link as={RemixLink} to="/payments/add" display="block">
            <HStack as="span">
              <PlusIcon /> <span>Add new payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      {data.map((expense) => (
        <Box
          key={expense.id}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
        >
          <Stack as={RemixLink} to="/payments/123" px="4" py="2">
            <HStack justifyContent="space-between">
              <Heading as="h3" size="md">
                Personal
              </Heading>
              <span>10 oct</span>
            </HStack>
            <Box>
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(8000)}
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

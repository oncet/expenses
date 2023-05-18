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
    category: "Personal",
    date: "10 oct",
    amount: 8000,
  },
  {
    id: 2,
    category: "Alquiler",
    date: "10 oct",
    amount: 90000,
  },
  {
    id: 3,
    category: "Tarjeta",
    date: "10 oct",
    amount: 140000,
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
          <Stack as={RemixLink} to={`/payments/${expense.id}`} px="4" py="2">
            <HStack justifyContent="space-between">
              <Heading as="h3" size="md">
                {expense.category}
              </Heading>
              <span>{expense.date}</span>
            </HStack>
            <Box>
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(expense.amount)}
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

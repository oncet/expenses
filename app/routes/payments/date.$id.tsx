import {
  HStack,
  Heading,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
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

export default function View() {
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
      <TableContainer>
        <Table>
          <Tbody>
            {data.map((expense) => (
              <Tr
                key={expense.id}
                onClick={(event) => {
                  console.log("Test!", event);
                }}
                cursor="pointer"
              >
                <Td whiteSpace="normal">{expense.description}</Td>
                <Td textAlign="center">{expense.date}</Td>
                <Td isNumeric>
                  {Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(expense.amount)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

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
        <Table size="sm">
          <Tbody>
            <Tr
              onClick={(event) => {
                console.log("Test!", event);
              }}
              cursor="pointer"
            >
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>
                {Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(8000)}
              </Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>
                {Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(8000)}
              </Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>
                {Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "USD",
                }).format(8000)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

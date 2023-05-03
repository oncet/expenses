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

import ArrowLeftIcon from "~/components/icons/ArrowLeftIcon";
import PlusSmallIcon from "~/components/icons/PlusSmallIcon";

export default function View() {
  return (
    <>
      <Stack>
        <Heading as="h2">October</Heading>
        <Text>
          <Link as={RemixLink} to="add" display="inline-block">
            <HStack>
              <PlusSmallIcon />
              <em>Register new payment</em>
            </HStack>
          </Link>
        </Text>
        <Text>
          <Link as={RemixLink} to="/payments" display="inline-block">
            <HStack>
              <ArrowLeftIcon />
              <em>Back to payments</em>
            </HStack>
          </Link>
        </Text>
      </Stack>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
            <Tr>
              <Td whiteSpace="normal">
                Hola, cómo te va hoy? Todo bien, gracias
              </Td>
              <Td textAlign="center">10 oct</Td>
              <Td isNumeric>8000</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

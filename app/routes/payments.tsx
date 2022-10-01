import { Form, Link as RemixLink, Outlet } from "@remix-run/react";
import {
  Button,
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

export default function Index() {
  return (
    <Stack>
      <Text>
        <Link as={RemixLink} to="add">
          Register payment
        </Link>
      </Text>
      <Heading>This month</Heading>
      <Outlet />
      <TableContainer>
        <Table>
          <Tbody>
            <Tr>
              <Td>Personal</Td>
              <Td isNumeric>$5000</Td>
            </Tr>
            <Tr>
              <Td>Alquiler</Td>
              <Td isNumeric>$46100</Td>
            </Tr>
            <Tr>
              <Td>Gas</Td>
              <Td isNumeric>$2789</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Heading>Last month</Heading>
      <TableContainer>
        <Table>
          <Tbody>
            <Tr>
              <Td>Personal</Td>
              <Td isNumeric>$5000</Td>
            </Tr>
            <Tr>
              <Td>Alquiler</Td>
              <Td isNumeric>$46100</Td>
            </Tr>
            <Tr>
              <Td>Gas</Td>
              <Td isNumeric>$2789</Td>
            </Tr>
            <Tr>
              <Td>Internet</Td>
              <Td isNumeric>$13750</Td>
            </Tr>
            <Tr>
              <Td>Tarjeta</Td>
              <Td isNumeric>$139755</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Form>
        <Stack>
          <Button>Load more payments</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

import { Form, Link as RemixLink } from "@remix-run/react";
import {
  Button,
  Drawer,
  Heading,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useBoolean,
} from "@chakra-ui/react";
import PaymentDrawer from "~/components/PaymentDrawer";

export default function Index() {
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <Stack>
      <Heading>This month</Heading>
      <Button onClick={setIsOpen.on}>Register payment</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={setIsOpen.off}>
        <PaymentDrawer onCancel={setIsOpen.off} />
      </Drawer>
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

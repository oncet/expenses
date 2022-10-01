import {
  Form,
  Link as RemixLink,
  Outlet,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
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
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Stack>
      <Text>
        <Link as={RemixLink} to="add">
          Register payment
        </Link>
      </Text>
      <Heading>This month</Heading>
      <Drawer
        isOpen={location.pathname === "/payments/add"}
        placement="right"
        onClose={navigateToPayments}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Outlet context={{ onClose: navigateToPayments }} />
        </DrawerContent>
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

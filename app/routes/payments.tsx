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

const paymentsData = [
  {
    month: 10,
    payments: [
      {
        id: 1,
        description: "Personal",
        amount: 5000,
      },
    ],
  },
  {
    month: 9,
    payments: [
      {
        id: 1,
        description: "Personal",
        amount: 5000,
      },
    ],
  },
];

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Stack>
      <Text>
        <em>
          <Link as={RemixLink} to="add">
            Payment registration &rarr;
          </Link>
        </em>
      </Text>
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
      {paymentsData.map((paymentData) => (
        <div key={paymentData.month}>
          <Heading>Month #{paymentData.month}</Heading>
          <TableContainer>
            <Table>
              <Tbody>
                {paymentData.payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>{payment.description}</Td>
                    <Td>{payment.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ))}
      {/* <TableContainer>
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
      </TableContainer> */}
      <Form>
        <Stack>
          <Button>Load more payments</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

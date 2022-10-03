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
  HStack,
  Icon,
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
        isOpen={
          location.pathname === "/payments/add" ||
          location.pathname === "/payments/edit/1"
        }
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
            <Table size="sm">
              <Tbody>
                {paymentData.payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td width="0">
                      <Link as={RemixLink} to={"edit/" + payment.id}>
                        <HStack>
                          <Icon
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth={1.5}
                            boxSize={6}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </Icon>
                          <span>{payment.description}</span>
                        </HStack>
                      </Link>
                    </Td>
                    <Td isNumeric>${payment.amount}</Td>
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

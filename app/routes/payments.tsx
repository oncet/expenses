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
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import PencilSquareIcon from "~/components/icons/PencilSquareIcon";
import { paymentsData } from "~/utils/mocks";

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
                          <PencilSquareIcon />
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
      <Form>
        <Stack>
          <Button>Load more payments</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

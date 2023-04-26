import { Form, Link as RemixLink, Outlet, useNavigate } from "@remix-run/react";
import {
  Button,
  Heading,
  Link,
  Stack,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  chakra,
} from "@chakra-ui/react";

import BanknotesIcon from "~/components/icons/BanknotesIcon";
import PlusSmallIcon from "~/components/icons/PlusSmallIcon";
import { paymentsData } from "~/utils/mocks";
import PaymentsDrawer from "~/components/PaymentsDrawer";

function monthNumberToName(monthNumber: number | undefined) {
  const currentYear = new Date().getFullYear();
  const date =
    monthNumber !== undefined
      ? new Date(currentYear, monthNumber - 1, 1)
      : new Date();
  return date.toLocaleString("default", { month: "long" });
}

export default function Payments() {
  const navigate = useNavigate();

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Stack gap="5">
      <Stack>
        <Heading>Payments</Heading>
        <Text>
          <Link as={RemixLink} to="add" display="inline-block">
            <HStack>
              <PlusSmallIcon />
              <em>Register new payment</em>
            </HStack>
          </Link>
          <PaymentsDrawer>
            <Outlet context={{ onClose: navigateToPayments }} />
          </PaymentsDrawer>
        </Text>
      </Stack>
      <chakra.div
        border="2px solid"
        borderColor="blue.800"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading as="h3" size="lg" px="4" py="2">
          {monthNumberToName()} (current month)
        </Heading>
        <Text px="4" py="2">
          No payments registered for this month.
        </Text>
      </chakra.div>
      {paymentsData.map((paymentData) => (
        <chakra.div
          key={paymentData.month}
          border="2px solid"
          borderColor="blue.800"
          borderRadius="lg"
          overflow="hidden"
        >
          <Heading as="h3" size="lg" px="4" py="2">
            {monthNumberToName(paymentData.month)}
          </Heading>
          <TableContainer>
            <Table size="sm" variant="striped">
              <Tbody>
                {paymentData.payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td width="0">
                      <Link as={RemixLink} to={"edit/" + payment.id}>
                        <span>{payment.description}</span>
                      </Link>
                    </Td>
                    <Td isNumeric>${payment.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Text px="4" py="2" textAlign="right">
            And 8 more...
          </Text>
        </chakra.div>
      ))}
      <Form>
        <Stack>
          <Button>Load more</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

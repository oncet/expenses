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
  useColorModeValue,
} from "@chakra-ui/react";

import PlusSmallIcon from "~/components/icons/PlusSmallIcon";
import { paymentsData } from "~/utils/mocks";
import PaymentsDrawer from "~/components/PaymentsDrawer";

function monthNumberToName(monthNumber?: number) {
  const currentYear = new Date().getFullYear();
  const date =
    monthNumber !== undefined
      ? new Date(currentYear, monthNumber - 1, 1)
      : new Date();
  return date.toLocaleString("default", { month: "long" });
}

export default function Payments() {
  const navigate = useNavigate();
  const borderColor = useColorModeValue("gray.300", "blue.800");
  const borderColorEmpty = useColorModeValue("gray.100", "gray.700");

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Stack spacing="4">
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
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading as="h3" size="lg" px="4" py="2">
          {monthNumberToName()} (current)
        </Heading>
        <Text
          px="4"
          py="2"
          borderTop="1px solid"
          borderColor={borderColorEmpty}
        >
          No payments registered for this month.
        </Text>
      </chakra.div>
      {paymentsData.map((paymentData) => (
        <chakra.div
          key={paymentData.month}
          border="2px solid"
          borderColor={borderColor}
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
                    <Td width="0">{payment.description}</Td>
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

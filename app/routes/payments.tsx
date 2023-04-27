import {
  Button,
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
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Outlet, Link as RemixLink, useNavigate } from "@remix-run/react";

import MonthCard from "~/components/MonthCard";
import MonthCardHeading from "~/components/MonthCardHeading";
import PaymentsDrawer from "~/components/PaymentsDrawer";
import PlusSmallIcon from "~/components/icons/PlusSmallIcon";
import { paymentsData } from "~/utils/mocks";
import ArrowRightIcon from "../components/icons/ArrowRightIcon";

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
      <MonthCard>
        <MonthCardHeading>
          {monthNumberToName()} (current) <ArrowRightIcon />
        </MonthCardHeading>
        <Text
          px="4"
          py="2"
          borderTop="1px solid"
          borderColor={borderColorEmpty}
        >
          No payments registered for this month.
        </Text>
      </MonthCard>
      {paymentsData.map((paymentData) => (
        <MonthCard key={paymentData.month}>
          <MonthCardHeading>
            <HStack justifyContent="space-between">
              <span>{monthNumberToName(paymentData.month)}</span>
              <ArrowRightIcon />
            </HStack>
          </MonthCardHeading>
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
        </MonthCard>
      ))}
      <Form>
        <Stack>
          <Button>Load more</Button>
        </Stack>
      </Form>
    </Stack>
  );
}

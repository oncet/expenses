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
import { json } from "@remix-run/node";
import { Form, Link as RemixLink, useLoaderData } from "@remix-run/react";

import MonthCard from "~/components/MonthCard";
import MonthCardHeading from "~/components/MonthCardHeading";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { paymentsGroups } from "~/utils/mocks";

function monthNumberToName(monthNumber?: string) {
  const currentYear = new Date().getFullYear();
  const date =
    monthNumber !== undefined
      ? new Date(currentYear, Number(monthNumber) - 1, 1)
      : new Date();
  return date.toLocaleString("en-US", { month: "long" });
}

export const loader = async () => {
  return json({
    paymentsGroups,
  });
};

export default function Payments() {
  const { paymentsGroups } = useLoaderData<typeof loader>();

  const borderColorEmpty = useColorModeValue("gray.100", "gray.700");

  return (
    <Stack spacing="4">
      <Stack>
        <Heading as="h2">Payments</Heading>
        <Text>
          <Link as={RemixLink} to="/payments/add" display="block">
            <HStack as="span">
              <PlusIcon /> <span>Add new payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      <MonthCard>
        <MonthCardHeading>
          <Link
            as={RemixLink}
            to={`date/${monthNumberToName()}`}
            px="4"
            py="2"
            display="block"
          >
            <HStack justifyContent="space-between">
              <span>{monthNumberToName()} (current)</span> <ArrowRightIcon />
            </HStack>
          </Link>
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
      {paymentsGroups.map((paymentsGroup) => (
        <MonthCard key={paymentsGroup.month}>
          <MonthCardHeading>
            <Link
              as={RemixLink}
              to={`date/${paymentsGroup.year}/${paymentsGroup.month}`}
              px="4"
              py="2"
              display="block"
            >
              <HStack justifyContent="space-between">
                <span>{monthNumberToName(paymentsGroup.month)}</span>
                <ArrowRightIcon />
              </HStack>
            </Link>
          </MonthCardHeading>
          <TableContainer>
            <Table size="sm" variant="striped">
              <Tbody>
                {paymentsGroup.payments.map((payment) => (
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

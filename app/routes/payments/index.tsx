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
import { between } from "drizzle-orm";

import MonthCard from "~/components/MonthCard";
import MonthCardHeading from "~/components/MonthCardHeading";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { payment } from "~/schemas";
import {
  getMonthLastDay,
  getMonthStartDay,
  monthNumberToName,
} from "~/utils/dates";
import { db } from "~/utils/db";

export const loader = async () => {
  const paymentsGroups = [];

  const currentDate = new Date();

  for (let index = 0; index < 3; index++) {
    currentDate.setMonth(currentDate.getMonth() - index);

    const monthStartDate = getMonthStartDay(currentDate);
    const monthEndDate = getMonthLastDay(monthStartDate);

    const monthPayments = await db.query.payment.findMany({
      with: {
        category: true,
      },
      where: between(payment.paidOn, monthStartDate, monthEndDate),
      orderBy: payment.paidOn,
    });

    paymentsGroups.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      payments: monthPayments,
    });
  }

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
          {paymentsGroup.payments.length ? (
            <>
              <TableContainer>
                <Table size="sm" variant="striped">
                  <Tbody>
                    {paymentsGroup.payments.map((payment) => (
                      <Tr key={payment.id}>
                        <Td width="0">{payment.category?.description}</Td>
                        <Td isNumeric>${payment.amount}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>

              <Text px="4" py="2" textAlign="right">
                And 8 more...
              </Text>
            </>
          ) : (
            <Text
              px="4"
              py="2"
              borderTop="1px solid"
              borderColor={borderColorEmpty}
            >
              No payments registered for this month.
            </Text>
          )}
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

import {
  Button,
  HStack,
  Heading,
  Link,
  Stack,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { json } from "@remix-run/node";
import { Form, Link as RemixLink, useLoaderData } from "@remix-run/react";
import { asc, between, sql } from "drizzle-orm";

import MonthCard from "~/components/MonthCard";
import MonthCardHeading from "~/components/MonthCardHeading";
import PaymentsTable from "~/components/PaymentsTable";
import ArrowRightIcon from "~/components/icons/ArrowRightIcon";
import PlusIcon from "~/components/icons/PlusIcon";
import { payment } from "~/schemas";
import {
  getMonthLastDay,
  getMonthStartDay,
  monthNumberToName,
} from "~/utils/dates";
import { db } from "~/utils/db";

const paymentsPerMonthLimit = 5;

export const loader = async () => {
  const paymentsGroups = [];

  for (let index = 0; index < 4; index++) {
    const currentDate = new Date();

    currentDate.setMonth(currentDate.getMonth() - index);

    const monthStartDate = getMonthStartDay(currentDate);
    const monthEndDate = getMonthLastDay(monthStartDate);

    const monthPayments = await db.query.payment.findMany({
      with: {
        category: true,
      },
      where: between(payment.paidOn, monthStartDate, monthEndDate),
      orderBy: payment.paidOn,
      limit: paymentsPerMonthLimit,
    });

    const monthPaymentsCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(payment)
      .where(between(payment.paidOn, monthStartDate, monthEndDate));

    paymentsGroups.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      payments: monthPayments,
      count: monthPaymentsCount[0].count,
    });
  }

  const oldestPayment = await db.query.payment.findFirst({
    orderBy: asc(payment.paidOn),
  });

  const oldestPaymentDate = oldestPayment && new Date(oldestPayment.paidOn);

  oldestPaymentDate?.setDate(1);
  oldestPaymentDate?.setHours(0, 0, 0, 0);

  // TODO Type should be | undefined?
  const oldestPaymentsGroup = paymentsGroups[paymentsGroups.length - 1];

  const currentOldestDate = new Date(
    oldestPaymentsGroup.year,
    oldestPaymentsGroup.month
  );

  const hasMore = oldestPaymentDate
    ? oldestPaymentDate < currentOldestDate
    : false;

  return json({
    paymentsGroups,
    hasMore,
  });
};

export default function Payments() {
  const { paymentsGroups, hasMore } = useLoaderData<typeof loader>();

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
              <PaymentsTable>
                {paymentsGroup.payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td width="0">{payment.category?.description}</Td>
                    <Td isNumeric>${payment.amount}</Td>
                  </Tr>
                ))}
              </PaymentsTable>
              {paymentsGroup.count > paymentsPerMonthLimit && (
                <Text px="4" py="2" textAlign="right">
                  And {paymentsGroup.count - paymentsPerMonthLimit} more...
                </Text>
              )}
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
      {hasMore && (
        <Form>
          <Stack>
            <Button>Load more</Button>
          </Stack>
        </Form>
      )}
    </Stack>
  );
}

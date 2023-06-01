import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link as RemixLink, useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";

import PencilSquareIcon from "~/components/icons/PencilSquareIcon";
import { payment } from "~/schemas";
import { db } from "~/utils/db";

export const loader = async ({ params }: LoaderArgs) => {
  const currentPayment = await db.query.payment.findFirst({
    where: eq(payment.id, Number(params.id)),
  });

  if (!currentPayment) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({
    currentPayment,
  });
};

export default function View() {
  const { currentPayment } = useLoaderData<typeof loader>();

  return (
    <Stack spacing="4">
      <Stack>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RemixLink} to="/payments/date/October">
              October
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h2">Personal (#{currentPayment.id})</Heading>
        <Text>
          <Link as={RemixLink} to="edit" display="block">
            <HStack as="span">
              <PencilSquareIcon /> <span>Edit payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      <chakra.dl display="flex" flexDirection="column" gap="5">
        <Box>
          <chakra.dt>
            <strong>Amount</strong>
          </chakra.dt>
          <chakra.dd>
            {Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            }).format(+currentPayment.amount)}
          </chakra.dd>
        </Box>
        <Box>
          <chakra.dt>
            <strong>Date</strong>
          </chakra.dt>
          <chakra.dd>{currentPayment.paidOn}</chakra.dd>
        </Box>
        <Box>
          <chakra.dt>
            <strong>Details</strong>
          </chakra.dt>
          <chakra.dd>
            {currentPayment.description
              ? currentPayment.description
              : "No details."}
          </chakra.dd>
        </Box>
        <Box>
          <chakra.dt>
            <strong>Attachments</strong>
          </chakra.dt>
          <chakra.dd>No attachments.</chakra.dd>
        </Box>
      </chakra.dl>
    </Stack>
  );
}

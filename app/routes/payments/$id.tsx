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

import PencilSquareIcon from "~/components/icons/PencilSquareIcon";

export const loader = async ({ params }: LoaderArgs) => {
  return json({
    payment: {
      id: params.id,
    },
  });
};

export default function View() {
  const { payment } = useLoaderData<typeof loader>();

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
        <Heading as="h2">Personal (#{payment.id})</Heading>
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
            }).format(180000)}
          </chakra.dd>
        </Box>
        <Box>
          <chakra.dt>
            <strong>Date</strong>
          </chakra.dt>
          <chakra.dd>
            Thu May 18 2023 15:39:13 GMT-0300 (Argentina Standard Time)
          </chakra.dd>
        </Box>
        <Box>
          <chakra.dt>
            <strong>Details</strong>
          </chakra.dt>
          <chakra.dd>No details.</chakra.dd>
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

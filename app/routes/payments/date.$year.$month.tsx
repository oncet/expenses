import {
  Box,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { json } from "@remix-run/node";
import { Link as RemixLink, useLoaderData } from "@remix-run/react";

import PlusIcon from "~/components/icons/PlusIcon";
import { payments } from "~/utils/mocks";

export const loader = async () => {
  return json({
    payments,
  });
};

export default function ViewDate() {
  const { payments } = useLoaderData<typeof loader>();

  const borderColor = useColorModeValue("gray.300", "blue.800");

  return (
    <Stack spacing="4">
      <Stack>
        <Heading as="h2">October</Heading>
        <Text>
          <Link as={RemixLink} to="/payments/add" display="block">
            <HStack as="span">
              <PlusIcon /> <span>Add new payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      {payments.map((payment) => (
        <Box
          key={payment.id}
          border="2px solid"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
        >
          <Stack as={RemixLink} to={`/payments/${payment.id}`} px="4" py="2">
            <HStack justifyContent="space-between">
              <Heading as="h3" size="md">
                {payment.category}
              </Heading>
              <span>{payment.date}</span>
            </HStack>
            <Box>
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(payment.amount)}
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

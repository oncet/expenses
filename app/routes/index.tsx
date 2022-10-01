import { Link as RemixLink } from "@remix-run/react";
import { Link, Stack, Text } from "@chakra-ui/react";

export default function Index() {
  return (
    <Stack>
      <Text textAlign="center">
        Go to{" "}
        <Link as={RemixLink} to="payments">
          payments
        </Link>
        .
      </Text>
    </Stack>
  );
}

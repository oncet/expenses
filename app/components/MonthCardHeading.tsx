import { HStack, Heading, Link } from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";
import type { ReactNode } from "react";

import ArrowRightIcon from "~/components/icons/ArrowRightIcon";

type MonthCardHeadingProps = {
  children: ReactNode;
  to: string;
};

export default function MonthCardHeading({
  children,
  to,
}: MonthCardHeadingProps) {
  return (
    <Heading as="h3" size="lg">
      <Link as={RemixLink} to={to} px="4" py="2" display="block">
        <HStack justifyContent="space-between">
          <span>{children}</span>
          <ArrowRightIcon />
        </HStack>
      </Link>
    </Heading>
  );
}

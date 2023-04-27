import { Heading } from "@chakra-ui/react";
import type { ReactNode } from "react";

type MonthCardHeadingProps = {
  children: ReactNode;
};

export default function MonthCardHeading({ children }: MonthCardHeadingProps) {
  return (
    <Heading as="h3" size="lg" px="4" py="2">
      {children}
    </Heading>
  );
}

import { chakra, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

type MonthCardProps = {
  children: ReactNode;
};

export default function MonthCard({ children }: MonthCardProps) {
  const borderColor = useColorModeValue("gray.300", "blue.800");

  return (
    <chakra.div
      border="2px solid"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
    >
      {children}
    </chakra.div>
  );
}

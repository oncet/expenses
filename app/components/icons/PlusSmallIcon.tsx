import { Icon, useColorModeValue } from "@chakra-ui/react";

export default function PlusIcon() {
  const strokeColor = useColorModeValue("black", "white");

  return (
    <Icon
      viewBox="0 0 24 24"
      stroke={strokeColor}
      strokeWidth={1.5}
      boxSize={6}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </Icon>
  );
}

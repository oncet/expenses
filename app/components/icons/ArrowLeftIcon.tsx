import { Icon, useColorModeValue } from "@chakra-ui/react";

export default function ArrowLeftIcon() {
  const strokeColor = useColorModeValue("black", "white");

  return (
    <Icon
      viewBox="0 0 24 24"
      stroke={strokeColor}
      strokeWidth={1.5}
      boxSize={6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </Icon>
  );
}

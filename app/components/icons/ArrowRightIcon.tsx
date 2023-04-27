import { Icon, useColorModeValue } from "@chakra-ui/react";

export default function ArrowRightIcon() {
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
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </Icon>
  );
}

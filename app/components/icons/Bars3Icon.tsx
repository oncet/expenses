import { Icon, useColorModeValue } from "@chakra-ui/react";

export default function Bars3Icon() {
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </Icon>
  );
}

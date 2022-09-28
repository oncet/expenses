import { chakra, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";

export default function Footer() {
  const { toggleColorMode } = useColorMode();

  return (
    <chakra.footer>
      <IconButton
        icon={<MoonIcon />}
        aria-label="Toggle dark mode"
        onClick={toggleColorMode}
      />
    </chakra.footer>
  );
}

import { Icon } from "@chakra-ui/react";

export default function PlusIcon() {
  return (
    <Icon viewBox="0 0 24 24" stroke="white" strokeWidth={1.5} boxSize={6}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Icon>
  );
}

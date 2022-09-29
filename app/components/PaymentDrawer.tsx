import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";

type PaymentDrawerProps = {
  onCancel: () => void;
};

export default function PaymentDrawer({ onCancel }: PaymentDrawerProps) {
  return (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Register payment</DrawerHeader>
        <DrawerBody>
          <Stack>
            <FormControl>
              <FormLabel>Select an existing description</FormLabel>
              <Select>
                <option>Personal</option>
                <option>Alquiler</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Or enter a new one</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Payment amount</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl>
              <FormLabel>Details</FormLabel>
              <Textarea />
              <FormHelperText>Enter any additional details.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" />
            </FormControl>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save payment</Button>
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}

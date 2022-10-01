import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useOutletContext } from "@remix-run/react";

type ContextType = { onClose: () => {} };

export default function Index() {
  const { onClose } = useOutletContext<ContextType>();

  return (
    <>
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
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="blue">Save payment</Button>
      </DrawerFooter>
    </>
  );
}

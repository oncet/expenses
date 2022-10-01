import {
  Button,
  Drawer,
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
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();

  const navigateToPayments = () => {
    navigate("/payments");
  };

  return (
    <Drawer isOpen placement="right" onClose={navigateToPayments}>
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
          <Button variant="outline" mr={3} onClick={navigateToPayments}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save payment</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

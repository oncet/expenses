import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Select,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { Link as RemixLink } from "@remix-run/react";

import ArrowLeftIcon from "../../components/icons/ArrowLeftIcon";

export default function Edit() {
  return (
    <Stack spacing="4">
      <Stack>
        <Heading as="h2">Edit payment #id</Heading>
        <Text>
          <Link as={RemixLink} to="/payments/123" display="block">
            <HStack as="span">
              <ArrowLeftIcon /> <span>View payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      <Form>
        <Stack spacing="4">
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
            <FormLabel>Files</FormLabel>
            <Input
              type="file"
              multiple
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
            <FormHelperText>Attach any related documents.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" />
          </FormControl>
          <Button colorScheme="blue">Save changes</Button>
          <Button variant="outline" colorScheme="red">
            Delete payment
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}

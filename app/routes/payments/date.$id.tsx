import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RemixLink } from "@remix-run/react";

import PlusIcon from "~/components/icons/PlusIcon";

const data = [
  {
    id: 1,
    description: "Personal",
    date: "10 oct",
    amount: 8000,
  },
  {
    id: 2,
    description: "Alquiler",
    date: "10 oct",
    amount: 8000,
  },
  {
    id: 3,
    description: "Tarjeta",
    date: "10 oct",
    amount: 8000,
  },
];

export default function View() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack spacing="4">
      <Stack>
        <Heading as="h2">October</Heading>
        <Text>
          <Link as={RemixLink} to="/payments/add" display="block">
            <HStack as="span">
              <PlusIcon /> <span>Add new payment</span>
            </HStack>
          </Link>
        </Text>
      </Stack>
      <TableContainer>
        <Table>
          <Tbody>
            {data.map((expense) => (
              <Tr key={expense.id} onClick={onOpen} cursor="pointer">
                <Td whiteSpace="normal">{expense.description}</Td>
                <Td textAlign="center">{expense.date}</Td>
                <Td isNumeric>
                  {Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(expense.amount)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted");
              }}
            >
              <Input name="nickname" placeholder="Type here..." />
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" form="my-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
}
